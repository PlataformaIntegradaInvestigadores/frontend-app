import { Component, EventEmitter, Input, Output, SimpleChanges, Inject } from '@angular/core';
import { BehaviorSubject, catchError, Observable, switchMap, tap } from "rxjs";
import { Article, ArticleResult, PaginationArticleResult } from "../../../../../shared/interfaces/article.interface";
import { ArticleService } from "../../../../domain/services/article.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-information',
  templateUrl: './article-information.component.html',
  styleUrls: ['./article-information.component.css']
})
export class ArticleInformationComponent {
  displayedColumns: string[] = ['title', 'author_count', 'affiliation_count', 'publication_date', 'relevance'];

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

  activeFilter: 'any' | 'year0' | 'year1' | 'year2' | 'custom' = 'any';
  currentYear = new Date().getFullYear();
  showCustomRange = false;

  minAvailableYear: number = 2000;
  maxAvailableYear: number = this.currentYear;

  startYear: number = 2000;
  endYear: number = this.currentYear;

  constructor(private articleService: ArticleService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    @Inject(Router) private router: Router) {
  }

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    if (params['page']) this.page = Number(params['page']);
    if (params['size']) this.size = Number(params['size']);
    if (params['activeFilter']) this.activeFilter = params['activeFilter'];
    if (params['years']) {
      this.selectedYears = params['years'].split(',').map(Number);
      if (this.activeFilter === 'custom') {
        this.showCustomRange = true;
        this.startYear = Math.min(...this.selectedYears);
        this.endYear = Math.max(...this.selectedYears);
      }
    }
    this.refreshTable$.next({
      page: this.page,
      size: this.size,
      years: this.selectedYears.length ? this.selectedYears : undefined
    });

    this.loadSearchFilters();
    this.articles$ = this.refreshTable$
      .pipe(
        tap(() => {
          this.loading.emit(true)
          this.isLoadingResults = true
        }),
        switchMap(({ page, size, type, years }) => {
          if (type) {
            return this.articleService.getMostRelevantArticlesByQuery(this.query, page, size, type, years)
          } else {
            return this.articleService.getMostRelevantArticlesByQuery(this.query, page, size)
          }
        }
        ),
        tap((response) => {
          this.loading.emit(false);
          this.isLoadingResults = false;
          this.total = response.total;

          if (this.setYears && response.years && this.years.length === 0) {
            this.years = response.years.map((year) => Number(year)).sort((a, b) => b - a);
            if (this.years.length > 0) {
              this.minAvailableYear = Math.min(...this.years);
              this.maxAvailableYear = Math.max(...this.years);
              this.startYear = this.minAvailableYear;
              this.endYear = this.maxAvailableYear;
            }
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
      if (!changes['query'].isFirstChange()) {
        this.setYears = true;
        this.selectedYears = [];
        this.page = 1;
        this.activeFilter = 'any';
        this.isFirstLoad = true;
        this.refreshTable$.next({ page: this.page, size: this.size });
        this.updateQueryParams();
      }
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
    const payload: { page: number; size: number; type?: string; years?: number[] } = {
      page: this.page,
      size: this.size
    };

    if (this.selectedType) {
      payload.type = this.selectedType;
      payload.years = this.selectedYears;
    }

    this.refreshTable$.next(payload);
    this.updateQueryParams();
  }

  applyScholarFilter(filter: 'any' | 'year0' | 'year1' | 'year2' | 'custom') {
    this.activeFilter = filter;
    this.showCustomRange = (filter === 'custom');

    if (filter === 'any') {
      this.selectedYears = [];
      this.applyFilters();
      return;
    }

    if (filter === 'custom') {
      return;
    }

    let start = 2000;
    let end = this.currentYear;

    if (filter === 'year0') {
      start = this.currentYear;
    } else if (filter === 'year1') {
      start = this.currentYear - 1;
    } else if (filter === 'year2') {
      start = this.currentYear - 2;
    }

    this.selectedYears = Array.from({ length: (end - start) + 1 }, (_, i) => start + i);
    this.applyFilters();
  }

  onCustomRangeChange() {
    // Para cuando se desliza el slider (si queremos búsqueda en tiempo real, lo llamamos desde el botón en lugar de desde (change))
  }

  applyCustomRange() {
    if (this.startYear <= this.endYear) {
      this.selectedYears = Array.from({ length: (this.endYear - this.startYear) + 1 }, (_, i) => this.startYear + i);
      this.applyFilters();
    }
  }

  onClickYearsFilter(type: string) {
    if (this.selectedYears.length > 0) {
      payload.years = [...this.selectedYears]
    }

    this.isFiltering = true;
    this.refreshTable$.next(payload)
    this.updateQueryParams();
  }

  private updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.page > 1 ? this.page : null,
        size: this.size !== 10 ? this.size : null,
        activeFilter: this.activeFilter !== 'any' ? this.activeFilter : null,
        years: this.selectedYears.length > 0 ? this.selectedYears.join(',') : null
      },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  private loadSearchFilters() {
    this.articleService.getSearchFilters().subscribe({
      next: (filters) => {
        this.years = (filters.years ?? []).map((year) => Number(year)).sort((a, b) => b - a)
        if (this.years.length > 0 && this.minAvailableYear === 2000) {
          this.minAvailableYear = Math.min(...this.years);
          this.maxAvailableYear = Math.max(...this.years);
          this.startYear = this.minAvailableYear;
          this.endYear = this.maxAvailableYear;
        }
      },
      error: (error) => {
        console.error('Error fetching filters', error)
      }
    })
  }

  seeMoreInformation(scopusId: string) {
    this.router.navigate(['home/article', scopusId]);
  }

}

