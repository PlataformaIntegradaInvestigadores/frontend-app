import { Component, Inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { AuthorService } from 'src/app/search-engine/domain/services/author.service';
import { PaginationAuthorResult } from 'src/app/shared/interfaces/author.interface';

@Component({
  selector: 'app-author-retrieve',
  templateUrl: './author-retrieve.component.html',
  styleUrls: ['./author-retrieve.component.css'],
})
export class AuthorRetrieveComponent {

  @Input()
  query: string = '';
  pageEvent: PageEvent = new PageEvent();
  page: number = 1;
  size: number = 10;
  total: number = 0;
  authors!:Observable<PaginationAuthorResult>
  refreshTable$: BehaviorSubject<{ page: number, size: number }> = new BehaviorSubject<{ page: number, size: number }>({ page: this.page, size: this.size });
  isLoading: boolean = false;
  displayedColumns: string[] = ['name','current_affiliation','articles','topics', 'affiliations', 'citation_count', 'updated'];

  constructor(private authorService: AuthorService, @Inject(Router) private router: Router) { }

  ngOnInit(): void {
    this.retrieveAuthors();
  }

  retrieveAuthors() {
    this.authors = this.refreshTable$.pipe(
      tap(() => {
        this.isLoading = true;
      }),
      switchMap(({ page, size }) => {
        return this.authorService.getAuthorsByQuery(this.query, page, size);
      }),
      tap((authors) => {
        this.total = authors.total;
        this.isLoading = false;
      })
    );

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['query']) {
      this.refreshTable$.next({ page: this.page, size: this.size });
    }

  }

  onChangePagination(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.size = event.pageSize;
    this.refreshTable$.next({ page: this.page, size: this.size });
  }

  goToScopus(scopus_id: string) {
    window.open(`https://www.scopus.com/authid/detail.uri?authorId=${scopus_id}`, '_blank');
  }

  goToAuthor(scopus_id: string) {
    const url = this.router.serializeUrl(this.router.createUrlTree(['/profile', scopus_id]));
    window.open(url, '_blank');
  }
}
