import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleComparator, AuthorComparator, ModelCorpusObserver, Status } from '../entities/author.comparator.interface';
import {
  DashboardCounts,
  EtlStatusResponse,
  HeatmapResponse,
  SystemHealth,
  Word,
  YearsResponse
} from "../../../shared/interfaces/dashboard.interface";

@Injectable({
  providedIn: 'root'
})
export class DashboardAdminService {
  rootURL: string = environment.apiCentinela;
  constructor(private httpClient: HttpClient) { }

  getAuthorComparator(): Observable<AuthorComparator> {
    return this.httpClient.get<AuthorComparator>(`${this.rootURL}/v1/dashboard/information/get_authors_comparator/`);
  }

  getArticlesComparator(): Observable<ArticleComparator> {
    return this.httpClient.get<ArticleComparator>(`${this.rootURL}/v1/dashboard/information/get_articles_comparator/`);
  }

  getmodelCorpusObserver(): Observable<ModelCorpusObserver> {
    return this.httpClient.get<ModelCorpusObserver>(`${this.rootURL}/v1/dashboard/information/tfidf_model_corpus/`);
  }

  generateCorpus(): Observable<Status> {
    return this.httpClient.post<Status>(`${this.rootURL}/v1/generate-corpus/`,{});
  }

  generateModel(): Observable<Status> {
    return this.httpClient.post<Status>(`${this.rootURL}/v1/generate-model/`, {});
  }

  getNoSqlDbYears(): Observable<YearsResponse[]> {
    return this.httpClient.get<YearsResponse[]>(`${this.rootURL}/v1/dashboard/country/get_last_years/`);
  }
  getNoSqlDbCounts(year: number): Observable<DashboardCounts> {
    let params = new HttpParams().set('year', year.toString());
    return this.httpClient.get<DashboardCounts>(`${this.rootURL}/v1/dashboard/country/get_acumulated/`, {params});
  }

  populateNoSqlDb(): Observable<Status> {
    return this.httpClient.post<Status>(`${this.rootURL}/v1/dashboard/populate`,{});
  }

  /** Dispara upsert_mongo en segundo plano. El servidor responde 202 de inmediato. */
  runEtl(): Observable<{ status: string; message: string }> {
    return this.httpClient.post<{ status: string; message: string }>(
      `${this.rootURL}/v1/admin/etl/run/`, {}
    );
  }

  /** Polling: devuelve status ('running'|'idle') + metadata de la última ejecución. */
  getEtlStatus(): Observable<EtlStatusResponse> {
    return this.httpClient.get<EtlStatusResponse>(`${this.rootURL}/v1/admin/etl/run/`);
  }

  /** Top instituciones por producción en un año (colección affiliation_year). */
  getTopAffiliationsYear(year: number): Observable<Word[]> {
    let params = new HttpParams().set('year', year.toString());
    return this.httpClient.get<Word[]>(`${this.rootURL}/v1/dashboard/affiliation/get_top_affiliations_year/`, {params});
  }

  /** Matriz Tópicos × Universidades para un año (affiliation_topics_year, aggregation pipeline). */
  getTopicsHeatmap(year: number, topAffiliations = 10, topTopics = 12): Observable<HeatmapResponse> {
    let params = new HttpParams()
      .set('year', year.toString())
      .set('top_affiliations', topAffiliations.toString())
      .set('top_topics', topTopics.toString());
    return this.httpClient.get<HeatmapResponse>(`${this.rootURL}/v1/dashboard/affiliation/get_topics_heatmap/`, {params});
  }

  /** Tópicos nacionales más frecuentes (country_topics) — usado en treemap y nube de palabras. */
  getCountryTopics(numberTop: number): Observable<Word[]> {
    let params = new HttpParams().set('number_top', numberTop.toString());
    return this.httpClient.get<Word[]>(`${this.rootURL}/v1/dashboard/country/get_topics/`, {params});
  }

  /** Salud de la sincronización Neo4j → MongoDB (autores sin métricas, artículos pendientes, colecciones desactualizadas). */
  getSystemHealth(): Observable<SystemHealth> {
    return this.httpClient.get<SystemHealth>(`${this.rootURL}/v1/dashboard/information/get_system_health/`);
  }
}
