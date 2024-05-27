import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  Author,
  AuthorResult,
  Coauthors,
  PaginationAuthorResult,
  RandItem
} from "../../../shared/interfaces/author.interface";

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  rootURL: string = '';

  constructor(private http: HttpClient) {}

  getAuthorsByQuery(
    query: string,
    page: number,
    size: number
  ): Observable<PaginationAuthorResult> {
    return this.http
      .get<PaginationAuthorResult>(
        `${this.rootURL}authors/get-authors-by-query?query=${query}&page=${page}&size=${size}`
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

  getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.rootURL}author/${id}`);
  }

  getCoauthorsById(id: number): Observable<Coauthors> {
    return this.http.get<Coauthors>(`${this.rootURL}coauthors/${id}`);
  }

  getMostRelevantAuthors(
    topic: string,
    authorsNumber: number,
    typeFilter?: string,
    affiliations?: number[]
  ): Observable<Coauthors> {
    let bodyParams: any = {
      topic: topic,
      authorsNumber: authorsNumber,
    };

    if (typeFilter) {
      bodyParams['type'] = typeFilter;
      bodyParams['affiliations'] = affiliations;
    }

    let data = this.http.post<Coauthors>(
      `${this.rootURL}coauthors/most-relevant-authors`,
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
