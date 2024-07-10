import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/search-engine/domain/services/author.service';
import { Author } from 'src/app/shared/interfaces/author.interface';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  author: Author | undefined;
  scopusId: string | null = null;

  constructor(private route: ActivatedRoute, private authorService: AuthorService) {
    console.log(this.author)
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.scopusId = params.get('id');
      if (this.scopusId) {
        this.getAuthor();
      }
    });
  }

  getAuthor(): void {
    if (this.scopusId) {
      this.authorService.getAuthorById(this.scopusId).subscribe(
        data => {
          this.author = data;
        },
        error => {
          console.error('Error fetching author', error);
        }
      );
    }
  }
}
