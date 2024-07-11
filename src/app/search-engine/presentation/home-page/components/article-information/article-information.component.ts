import {Component, EventEmitter, Input, Output, SimpleChanges, Inject} from '@angular/core';
import {BehaviorSubject, catchError, Observable, switchMap, tap} from "rxjs";
import {Article, ArticleResult, PaginationArticleResult} from "../../../../../shared/interfaces/article.interface";
import {ArticleService} from "../../../../domain/services/article.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PageEvent} from '@angular/material/paginator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-information',
  templateUrl: './article-information.component.html',
  styleUrls: ['./article-information.component.css']
})
export class ArticleInformationComponent {
  displayedColumns: string[] = ['title', 'author_count', 'affiliation_count', 'publication_date', 'status', 'citations'];

  @Input() query!: string
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>()

  clickedRows = (row: ArticleResult) => this.seeMoreInformation(row.scopus_id);

  page = 1;
  size = 10;
  total = 0;
  isLoadingResults = true;
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
          this.isLoadingResults = true
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
          this.loading.emit(false)
          this.isLoadingResults = false
          this.total = articles.total
          if (this.setYears) {
            this.years = []
            this.selectedYears = []
            this.selectedType = ''
            this.years = articles.years.sort((a, b) => b - a)
            this.isLoadingResults = false
          }
        }),
        catchError((error) => {
          console.error('Error fetching data', error)
          this.isLoadingResults = false
          this.loading.emit(false)
          return []
        })
      )
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['query']) {
      this.setYears = true
      this.refreshTable$.next({page: this.page, size: this.size})
    }
  }


  onChangePagination(event: PageEvent) {
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
    this.onClickYearsFilter('include')
  }

  onClickYearsFilter(type: string) {
    if (this.selectedYears.length > 0) {
      this.setYears = false
      this.selectedType = type
      this.refreshTable$.next({page: this.page, size: this.size, type: this.selectedType, years: this.selectedYears})
    }else{
      this.refreshTable$.next({page: this.page, size: this.size})
    }

  }

  seeMoreInformation(scopusId: string) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['home/article', scopusId])
    );
    window.open(url, '_blank');
  }

}

