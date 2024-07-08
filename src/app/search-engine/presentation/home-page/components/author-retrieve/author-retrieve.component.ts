import { Component, Inject, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router'; // Import Router from @angular/router
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
  constructor(private authorService: AuthorService, @Inject(Router) private router: Router) {} // Inject Router using @Inject decorator
  items: any;

  retrieveAuthors() {
    this.authorService
      .getAuthorsByQuery(this.query, this.page, this.size)
      .subscribe((response) => {
        this.items = response.data;
        console.log(this.items);
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
  goToAuthor(scopus_id: string) {
    console.log(scopus_id);
    console.log('Navigating to:', ['/profile', scopus_id]);
    this.router.navigate(['/profile',scopus_id]);

    }
}
