import {Component, OnInit} from '@angular/core';
import {AuthorService} from "../../../../search-engine/domain/services/author.service";
import {ActivatedRoute} from "@angular/router";
import {Author} from "../../../../shared/interfaces/author.interface";
import {NameValue, Word} from "../../../../shared/interfaces/dashboard.interface";

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.component.html',
  styleUrls: ['./fingerprint.component.css']
})
export class FingerprintComponent implements OnInit {
  constructor(private authorService: AuthorService, private route: ActivatedRoute,) {

  }

  // author!:Author
  scopusId!: number
  words!: NameValue[]

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      this.scopusId = parseInt(params?.get('id')!);
      console.log(this.scopusId)
      if (this.scopusId) {
        this.getTopics()
        // this.
      }
    });
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
