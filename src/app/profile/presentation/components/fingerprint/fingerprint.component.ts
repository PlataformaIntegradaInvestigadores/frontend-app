import {Component, OnInit} from '@angular/core';
import {AuthorService} from "../../../../search-engine/domain/services/author.service";
import {ActivatedRoute} from "@angular/router";
import {Author} from "../../../../shared/interfaces/author.interface";
import {NameValue, Word} from "../../../../shared/interfaces/dashboard.interface";
import {Subscription} from "rxjs";
import {User} from "../../../domain/entities/user.interfaces";
import {UserDataService} from "../../../domain/services/user_data.service";

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.component.html',
  styleUrls: ['./fingerprint.component.css']
})
export class FingerprintComponent implements OnInit {
  constructor(private authorService: AuthorService, private route: ActivatedRoute,private userDataService: UserDataService) {

  }

  private userSubscription: Subscription = new Subscription();
  user: User | null = null;
  // author!:Author
  scopusId!: number
  words!: NameValue[]

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      let id = parseInt(params?.get('id')!);
      console.log(this.scopusId)
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
        this.getTopics()
      }
    });
  }
  isNumeric(value: string): boolean {
    return /^\d+$/.test(value);
  }

  getTopics() {
    this.authorService.getTopicsById(this.scopusId).subscribe(
      data => {
        this.words = data
        console.log(this.words)
      }
    )
  }


}
