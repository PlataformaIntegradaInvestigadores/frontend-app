import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article, PaginationArticleResult} from "../../../shared/interfaces/article.interface";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  rootURL: string = environment.apiCentinela;

  constructor(private http: HttpClient) {
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.rootURL}api/v1/article/${id}/`)
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

    return this.http.post<PaginationArticleResult>(`${this.rootURL}api/v1/articles/most-relevant-articles-by-topic/`, bodyParams)
  }
}
