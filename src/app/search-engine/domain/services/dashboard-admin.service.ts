import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleComparator, AuthorComparator, ModelCorpusObserver, Status } from '../entities/author.comparator.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardAdminService {
  rootURL: string = environment.apiCentinela;
  constructor(private httpClient: HttpClient) { }

  getAuthorComparator(): Observable<AuthorComparator> {
    return this.httpClient.get<AuthorComparator>(`${this.rootURL}api/v1/dashboard/information/get_authors_comparator/`);
  }

  getArticlesComparator(): Observable<ArticleComparator> {
    return this.httpClient.get<ArticleComparator>(`${this.rootURL}api/v1/dashboard/information/get_articles_comparator/`);
  }

  getmodelCorpusObserver(): Observable<ModelCorpusObserver> {
    return this.httpClient.get<ModelCorpusObserver>(`${this.rootURL}api/v1/dashboard/information/tfidf_model_corpus/`);
  }

  generateCorpus(): Observable<Status> {
    return this.httpClient.get<Status>(`${this.rootURL}api/v1/generate-corpus/`);
  }

  generateModel(): Observable<Status> {
    return this.httpClient.get<Status>(`${this.rootURL}api/v1/generate-model/`);
  }
}
