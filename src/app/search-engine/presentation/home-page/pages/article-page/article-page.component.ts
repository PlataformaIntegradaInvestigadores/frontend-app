import {Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/search-engine/domain/services/article.service';
import { Article } from 'src/app/shared/interfaces/article.interface';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent {
  article!: Article | undefined;

  scopusId: string = '';

  constructor(private route:ActivatedRoute, private articleService:ArticleService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.scopusId = params['scopusId'];
    });
    this.retrieveArticle();
  }

  retrieveArticle(){
    this.articleService.getArticleById(this.scopusId).subscribe(article => {
      this.article = article;
    });
  }
}
