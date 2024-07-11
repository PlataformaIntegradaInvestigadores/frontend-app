import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  Author,
  AuthorResult, CoauthorInfo,
  Coauthors,
  PaginationAuthorResult,
  RandItem
} from "../../../shared/interfaces/author.interface";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  rootURL: string = environment.apiCentinela;

  constructor(private http: HttpClient) {}

  getAuthorsByQuery(
    query: string,
    page?: number,
    size?: number
  ): Observable<PaginationAuthorResult> {
    return this.http
      .get<PaginationAuthorResult>(
        `${this.rootURL}api/v1/authors/authors/find_by_query/?query=${query}&page=${page}&page_size=${size}`
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
    return this.http.get<Author>(`${this.rootURL}api/v1/authors/authors/${id}`);
  }

  getCoauthorsById(id: number): Observable<CoauthorInfo> {
    return this.http.get<CoauthorInfo>(`${this.rootURL}api/v1/coauthors/coauthors/${id}/coauthors_by_id/`);
  }

  getMostRelevantAuthors(
    topic: string,
    authors_number?: number,
    typeFilter?: string,
    affiliations?: number[]
  ): Observable<Coauthors> {
    let bodyParams: any = {
      topic: topic,
      authors_number: authors_number,
    };

    if (typeFilter) {
      bodyParams['type'] = typeFilter;
      bodyParams['affiliations'] = affiliations;
    }
    let data = this.http.post<Coauthors>(
      `${this.rootURL}/api/v1/authors/authors/most_relevant_authors/`,
      bodyParams
    );
    return data;
  }

  mapAuthorTopics(author: AuthorResult) {
    if (author.topics.length > 10) {
      author.topics = author.topics.splice(0, 10);
      author.topics.push('...');
    }
    return author;
  }

  getRandomAuthors(): Observable<RandItem[]> {
    return this.http.get<RandItem[]>(`${this.rootURL}random-authors`);
  }

  getRandomTopics(): Observable<RandItem[]> {
    return this.http.get<RandItem[]>(`${this.rootURL}random-topics`);
  }
}
