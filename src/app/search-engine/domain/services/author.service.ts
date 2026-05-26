import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {
  Author,
  AuthorResult, CoauthorInfo,
  Coauthors,
  PaginationAuthorResult,
  RandItem
} from "../../../shared/interfaces/author.interface";
import { environment } from 'src/environments/environment';
import {
  AuthorYears,
  LineChartInfo,
  NameValue,
  Word,
  YearsResponse
} from "../../../shared/interfaces/dashboard.interface";
import {ArticlesResponse} from "../../../shared/interfaces/article.interface";

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  rootURL: string = environment.apiCentinela;
  // dashURL: string = environment.apiDashboard;


  constructor(private http: HttpClient) {}

  getAuthorsByQuery(
    query: string,
    page?: number,
    size?: number
  ): Observable<PaginationAuthorResult> {
    const bodyParams = {
      query: query,
      page: page ?? 1,
      page_size: size ?? 10
    };

    return this.http
      .post<PaginationAuthorResult>(
        `${this.rootURL}/v2/authors/search`,
        bodyParams
      )
      .pipe(
        map((response) => {
          let mappedData = response.data.map((author) => {
            return this.mapAuthorTopics(author);
          });
          return { data: mappedData, total: response.total };
        })
      );
  }

  getAuthorById(id: string): Observable<Author> {
    return this.http.get<Author>(`${this.rootURL}/v2/authors/${id}`);
  }

  getCoauthorsById(id: number): Observable<CoauthorInfo> {
    return this.http.get<CoauthorInfo>(`${this.rootURL}/v1/coauthors/coauthors/${id}/coauthors_by_id/`);
  }

  getMostRelevantAuthors(
    topic: string,
    authors_number?: number,
    typeFilter?: string,
    affiliations?: string[]
  ): Observable<Coauthors> {
    const bodyParams: any = {
      query: topic,
      page: 1,
      page_size: authors_number
    };

    if (typeFilter || (affiliations && affiliations.length > 0)) {
      bodyParams['filters'] = {
        mode: typeFilter,
        affiliations: affiliations ?? []
      };
    }

    return this.http.post<Coauthors>(
      `${this.rootURL}/v2/authors/relevant`,
      bodyParams
    );
  }

  mapAuthorTopics(author: AuthorResult) {
    if (author.topics.length > 10) {
      author.topics = author.topics.splice(0, 10);
      author.topics.push('...');
    }
    return author;
  }

  // getRandomAuthors(): Observable<RandItem[]> {
  //   return this.http.get<RandItem[]>(`${this.rootURL}random-authors`);
  // }

  getRandomTopics(): Observable<RandItem[]> {
    return this.http.get<RandItem[]>(`${this.rootURL}random-topics`);
  }
  getTopicsById(scopus_id:number): Observable<NameValue[]> {
    let params = new HttpParams().set('scopus_id', scopus_id.toString());
    return this.http.get<Word[]>(`${this.rootURL}/v1/dashboard/author/get_topics/`, {params}).pipe(
      map(response => {
        const series: NameValue[] = response.map(t => ({
          name: t.text.toString(),
          value: t.size
        }));
        return series
      }));
  }

  getYears(scopus_id: string): Observable<AuthorYears[]> {
    let params = new HttpParams().set('scopus_id', scopus_id.toString())
    return this.http.get<AuthorYears[]>(`${this.rootURL}/v1/dashboard/author/get_author_years/`, {params});
  }

  getLineChartInfo(scopus_id:string, name: string): Observable<LineChartInfo[]> {
    return this.getYears(scopus_id).pipe(
      map(response => {
        console.log(response);
        const series: NameValue[] = response.map(au => ({
          name: au.year.toString(),
          value: au.total_articles
        }));
        console.log(series)
        return [{
          name: name,
          series: series
        }];
      })
    );
  }

  getArticles(scopus_id:string):Observable<ArticlesResponse[]>{
    let params = new HttpParams().set('author_id', scopus_id.toString())
    return this.http.get<ArticlesResponse[]>(`${this.rootURL}/v2/articles/by-author`, {params});
  }

}
