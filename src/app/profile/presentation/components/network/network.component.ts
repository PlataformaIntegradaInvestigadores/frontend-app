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
  scopusId!: number;

  constructor(private route: ActivatedRoute, private authorService: AuthorService) {
    console.log(this.author)
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.scopusId = parseInt(params?.get('id')!);
      console.log(this.scopusId)
      if (this.scopusId) {
        this.getAuthor();
      }
    });
  }

  getAuthor(): void {
    if (this.scopusId) {
      this.authorService.getAuthorById(this.scopusId.toString()).subscribe(
        data => {
          this.author = data;
          console.log(this.author)
        },
        error => {
          console.error('Error fetching author', error);
        }
      );
    }
  }
}
