import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorService} from "../../../../search-engine/domain/services/author.service";
import {ArticlesResponse} from "../../../../shared/interfaces/article.interface";
import {User} from "../../../domain/entities/user.interfaces";
import {Subscription} from "rxjs";
import {AuthService} from "../../../../auth/domain/services/auth.service";
import {UserDataService} from "../../../domain/services/user_data.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{
  // El componente actualmente no tiene lógica específica ni datos.

  idRoute!: string
  articles: ArticlesResponse[]= []
  private userSubscription: Subscription = new Subscription();
  user: User | null = null;
  // articles:

  constructor(private route: ActivatedRoute, private authorService: AuthorService, private router: Router, private userDataService: UserDataService) {
  }
  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      this.idRoute = params?.get('id')!;
      if (this.isNumeric(this.idRoute)) {
        this.authorService.getAuthorById(this.idRoute).subscribe(data => {
          this.idRoute = data.scopus_id.toString()
        })
        this.authorService.getArticles(this.idRoute).subscribe(data=>{
          this.articles = data
        })
      }else {
        this.userSubscription = this.userDataService.getUser().subscribe((user: User | null) => {
          this.user = user;
          if(this.user?.scopus_id){
            this.idRoute=this.user.scopus_id
            this.authorService.getArticles(this.idRoute).subscribe(data=>{
              this.articles = data
            })
          }
        });
      }
    });
  }
  isNumeric(value: string): boolean {
    return /^\d+$/.test(value);
  }
  seeMoreInformation(scopusId: string) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['home/article', scopusId])
    );
    window.open(url, '_blank');
  }
}
