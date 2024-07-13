import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthorService} from "../../../../search-engine/domain/services/author.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{
  // El componente actualmente no tiene lógica específica ni datos.

  idRoute!: string

  // articles:

  constructor(private route: ActivatedRoute, private authorService: AuthorService) {
  }
  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      this.idRoute = params?.get('id')!;
      if (this.isNumeric(this.idRoute)) {
        this.authorService.getAuthorById(this.idRoute).subscribe(data => {
        })
      }
    });
  }
  isNumeric(value: string): boolean {
    return /^\d+$/.test(value);
  }
}
