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
} )
export class ArticleInformationComponent {
  displayedColumns: string[] = ['title', 'author_count', 'affiliation_count', 'publication_date', 'relevance'];

  @Input() query!: string
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>()

  clickedRows = (row: ArticleResult) => this.seeMoreInformation(row.scopus_id);

  page = 1;
  size = 10;
  total = 0;
  isLoadingResults = true;
  refreshTable$: BehaviorSubject<{ page: number, size: number, years?: number[] }>
    = new BehaviorSubject<{ page: number, size: number, years?: number[] }>({
    page: this.page,
    size: this.size
  })

  articles$!: Observable<PaginationArticleResult>

  article!: Article

  years: number[] = []
  setYears = true

  selectedYears: number[] = []

  constructor(private articleService: ArticleService,
              private modalService: NgbModal,
              @Inject(Router) private router: Router) {
  }

  ngOnInit() {
    this.loadSearchFilters();
    this.articles$ = this.refreshTable$
      .pipe(
        tap(() => {
          this.loading.emit(true)
          this.isLoadingResults = true
        }),
        switchMap(({page, size, years}) => {
            if (years && years.length > 0) {
              return this.articleService.getMostRelevantArticlesByQuery(this.query, page, size, years)
            }
            return this.articleService.getMostRelevantArticlesByQuery(this.query, page, size)
          }
        ),
        tap((response) => {
          this.loading.emit(false);
          this.isLoadingResults = false;
          this.total = response.total_results ?? response.total;
          
          if (this.setYears && response.years && this.years.length === 0) {
            this.years = response.years.map((year) => Number(year)).sort((a, b) => b - a);
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
      this.selectedYears = []
      this.refreshTable$.next({page: this.page, size: this.size})
    }
  }

/*
asi es como esta haciendo la paginacion 
  onChangePagination(event: PageEvent) {
    this.setYears = false
    this.page = event.pageIndex + 1
    this.size = event.pageSize
    if (this.selectedType)
      this.refreshTable$.next({page: this.page, size: this.size, type: this.selectedType, years: this.selectedYears})
    else
      this.refreshTable$.next({page: this.page, size: this.size})
  }
*/
  onChangePagination(event: PageEvent) {
    this.setYears = false;
    this.page = event.pageIndex + 1; // Ya se está haciendo bien
    this.size = event.pageSize;
    const payload: { page: number; size: number; years?: number[] } = {
      page: this.page,
      size: this.size
    };

    if (this.selectedYears.length > 0) {
      payload.years = this.selectedYears;
    }

    this.refreshTable$.next(payload);
  }

  onYearToggle(year: number, isChecked: boolean) {
    if (isChecked) {
      if (!this.selectedYears.includes(year)) {
        this.selectedYears = [...this.selectedYears, year]
      }
    } else {
      this.selectedYears = this.selectedYears.filter((item) => item !== year)
    }
    this.applyFilters()
  }

  private applyFilters() {
    this.setYears = false
    this.page = 1
    const payload: { page: number; size: number; years?: number[] } = {
      page: this.page,
      size: this.size
    }

    if (this.selectedYears.length > 0) {
      payload.years = [...this.selectedYears]
    }

    this.refreshTable$.next(payload)
  }

  private loadSearchFilters() {
    this.articleService.getSearchFilters().subscribe({
      next: (filters) => {
        this.years = (filters.years ?? []).map((year) => Number(year)).sort((a, b) => b - a)
      },
      error: (error) => {
        console.error('Error fetching filters', error)
      }
    })
  }

  seeMoreInformation(scopusId: string) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['home/article', scopusId])
    );
    window.open(url, '_blank');
  }

}

