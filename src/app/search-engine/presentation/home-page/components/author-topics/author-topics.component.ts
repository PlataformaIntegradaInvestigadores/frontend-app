import {Component, Input} from '@angular/core';
import {Topic} from "../../../../../shared/interfaces/author.interface";

@Component({
  selector: 'app-author-topics',
  templateUrl: './author-topics.component.html',
  styleUrls: ['./author-topics.component.css']
})
export class AuthorTopicsComponent {
  @Input()
  topics:String[]=[];
}
