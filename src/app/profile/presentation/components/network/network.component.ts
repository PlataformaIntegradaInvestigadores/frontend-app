import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/search-engine/domain/services/author.service';
import { Author } from 'src/app/shared/interfaces/author.interface';
import {User} from "../../../domain/entities/user.interfaces";
import {Subscription} from "rxjs";
import {UserDataService} from "../../../domain/services/user_data.service";

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  author: Author | undefined;
  scopusId!: number;
  private userSubscription: Subscription = new Subscription();
  user: User | null = null;

  constructor(private route: ActivatedRoute, private authorService: AuthorService, private userDataService: UserDataService) {
    console.log(this.author)
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      let id = parseInt(params?.get('id')!);
      if(this.isNumeric(id.toString())){
        this.scopusId = id;
      }else{
        this.userSubscription = this.userDataService.getUser().subscribe((user: User | null) => {
          this.user = user;
          if (this.user?.scopus_id) {
            this.scopusId = parseInt(this.user.scopus_id)
          }
        });
      }
      if (this.scopusId) {
        this.getAuthor();
      }
    });
  }

  isNumeric(value: string): boolean {
    return /^\d+$/.test(value);
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
