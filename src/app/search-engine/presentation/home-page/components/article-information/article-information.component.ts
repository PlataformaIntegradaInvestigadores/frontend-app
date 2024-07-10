import {Component, EventEmitter, Input, Output, SimpleChanges, Inject} from '@angular/core';
import {BehaviorSubject, Observable, switchMap, tap} from "rxjs";
import {Article, PaginationArticleResult} from "../../../../../shared/interfaces/article.interface";
import {ArticleService} from "../../../../domain/services/article.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-information',
  templateUrl: './article-information.component.html',
  styleUrls: ['./article-information.component.css']
})
export class ArticleInformationComponent {

  @Input() query!: string
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>()

  page = 1;
  size = 5;
  total = 0;

  refreshTable$: BehaviorSubject<{ page: number, size: number, type?: string, years?: number[] }>
    = new BehaviorSubject<{ page: number, size: number, type?: string, years?: number[] }>({
    page: this.page,
    size: this.size
  })

  articles$!: Observable<PaginationArticleResult>

  article!: Article

  years!: number[]
  setYears = true

  selectedYears: number[] = []
  selectedType!: string

  constructor(private articleService: ArticleService,
              private modalService: NgbModal, @Inject(Router) private router: Router) {
  }

  ngOnInit() {
    this.articles$ = this.refreshTable$
      .pipe(
        tap(() => {
          this.loading.emit(true)
        }),
        switchMap(({page, size, type, years}) => {
            if (type) {
              return this.articleService.getMostRelevantArticlesByQuery(this.query, page, size, type, years)
            } else {
              return this.articleService.getMostRelevantArticlesByQuery(this.query, page, size)
            }
          }
        ),
        tap((articles) => {
          console.log(articles);
          this.loading.emit(false)
          this.total=articles.total
          if (this.setYears) {
            this.years = []
            this.selectedYears = []
            this.selectedType = ''
            this.years = articles.years.sort((a,b) => b-a)
          }
        })
      )
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['query']) {
      this.setYears = true
      this.refreshTable$.next({page: this.page, size: this.size})
    }
  }


  onChangePagination(event:PageEvent) {
    this.setYears = false
    this.page = event.pageIndex + 1
    this.size = event.pageSize
    if (this.selectedType)
      this.refreshTable$.next({page: this.page, size: this.size, type: this.selectedType, years: this.selectedYears})
    else
      this.refreshTable$.next({page: this.page, size: this.size})
  }

  onClickCheckbox(event: any) {
    let item = Number(event.target.id)
    if (event.target.checked) {
      this.selectedYears.push(item)
    } else {
      this.selectedYears.splice(this.selectedYears.indexOf(item), 1)
    }
  }

  onClickYearsFilter(type: string) {
    this.setYears = false
    this.selectedType = type
    this.refreshTable$.next({page: this.page, size: this.size, type: this.selectedType, years: this.selectedYears})
  }

  openModal(content: any, articleId: string) {
    this.articleService.getArticleById(articleId).subscribe((article: Article) => {
      this.article = article
      this.modalService.open(content, {scrollable: true, size: "lg", centered: true}).result.then();
    })
  }

  goToArticle(scopus: string) {
    window.open(`https://www.scopus.com/record/display.uri?eid=2-s2.0-${scopus}&origin=resultslist`, '_blank')
  }
  seeMoreInformation(scopusId:string){
    console.log(scopusId);
    this.router.navigate(['home/article/', scopusId]);
  }
}
