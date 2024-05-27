import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article, PaginationArticleResult} from "../../../shared/interfaces/article.interface";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  rootURL: string = ''

  constructor(private http: HttpClient) {
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.rootURL}article/${id}`)
  }

  getMostRelevantArticlesByQuery(topic: string, page: number, size: number, typeFilter?: string, years?: number[]): Observable<PaginationArticleResult> {
    let bodyParams: any = {
      topic,
      page,
      size,
    }

    if (typeFilter) {
      bodyParams['type'] = typeFilter
      bodyParams['years'] = years
    }

    return this.http.post<PaginationArticleResult>(`${this.rootURL}articles/most-relevant-articles`, bodyParams)
  }
}
