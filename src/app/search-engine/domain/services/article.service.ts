import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {Article, PaginationArticleResult} from "../../../shared/interfaces/article.interface";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  rootURL: string = environment.apiCentinela;

  constructor(private http: HttpClient) {
  }

  getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.rootURL}/v1/articles/${id}/`)
  }

  getMostRelevantArticlesByQuery(query: string, page: number, size: number, typeFilter?: string, years?: number[]): Observable<PaginationArticleResult> {

    let bodyParams: any = {
      query,
      page,
      top_k:size,
    }

    if (typeFilter) {
      bodyParams['type'] = typeFilter
      bodyParams['years'] = years
    }

    //return this.http.post<PaginationArticleResult>(`${this.rootURL}/v1/articles/most-relevant-articles-by-topic/`, bodyParams)
    return this.http.post<PaginationArticleResult>(
      `${this.rootURL}/v1/llm-search/semantic-search/`, 
      bodyParams
    );
  }
}




