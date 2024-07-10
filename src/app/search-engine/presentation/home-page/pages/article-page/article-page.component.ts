import {Component} from '@angular/core';
import { Title } from '@angular/platform-browser';
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

  constructor(private route:ActivatedRoute, private articleService:ArticleService, private title:Title) {
  }
  setArticleTitle(){
    this.title.setTitle(this.article?.title!);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.scopusId = params['scopusId'];
    });
    this.retrieveArticle();
  }

  retrieveArticle(){
    this.articleService.getArticleById(this.scopusId).subscribe(article => {
      console.log("Article", article)
      this.article = article;
      this.setArticleTitle();
    });
  }
  goToArticle(scopus: string | undefined) {
    window.open(`https://www.scopus.com/record/display.uri?eid=2-s2.0-${scopus}&origin=resultslist`, '_blank')
  }
  goToAuthor(scopus_id: string) {
    console.log(scopus_id);
    console.log('Navigating to:', ['/profile', scopus_id]);

    }
}
