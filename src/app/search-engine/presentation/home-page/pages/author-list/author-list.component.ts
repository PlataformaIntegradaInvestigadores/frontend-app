import { Component, Input } from '@angular/core';
import {
  Author,
} from '../../../../../shared/interfaces/author.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css'],
})
export class AuthorListComponent{
  authors: Author[] = []
  constructor(private title:Title){
  }

  ngOnInit(): void {
    this.title.setTitle("Authors")
  }
}
