import { Component, Inject, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { switchMap } from 'rxjs';
import { AuthorService } from 'src/app/search-engine/domain/services/author.service';
import { Author, AuthorResult } from 'src/app/shared/interfaces/author.interface';

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
  size: number = 5;
  total: number = 0;
  constructor(private authorService: AuthorService) {}
  items: any;

  retrieveAuthors() {
    this.authorService
      .getAuthorsByQuery(this.query, this.page, this.size)
      .subscribe((response) => {
        console.log(response);
        this.items = response.data;
        this.total = response.total;
      });
  }

  ngOnInit(): void {
    this.retrieveAuthors();
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.size = event.pageSize;
    this.retrieveAuthors();
  }

  goToScopus(scopus_id: string) {
    window.open(`https://www.scopus.com/authid/detail.uri?authorId=${scopus_id}`, '_blank');
  }
}
