import { Component, Input } from '@angular/core';
import {
  Author,
  Topic,
} from '../../../../../shared/interfaces/author.interface';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css'],
})
export class AuthorListComponent {
  authors: Author[] = [
    {
      name: 'Autor 1',
      email: 'autor1@example.com',
      affiliation: 'Afiliación 1',
      num_articles: 10,
      topics: [{ name: 'Software Design' }, { name: 'Clean Architecture' }],
    },
    {
      name: 'Autor 2',
      email: 'autor2@example.com',
      affiliation: 'Afiliación 2',
      num_articles: 5,
      topics: [{ name: 'Tema 3' }, { name: 'Tema 4' }, { name: 'Tema 8' }],
    },
    {
      name: 'Autor 3',
      email: 'autor3@example.com',
      affiliation: 'Afiliación 3',
      num_articles: 8,
      topics: [{ name: 'Tema 5' }, { name: 'Tema 6' }, { name: 'Tema 8' }],
    },
    {
      name: 'Autor 4',
      email: 'autor4@example.com',
      affiliation: 'Afiliación 4',
      num_articles: 12,
      topics: [{ name: 'Tema 7' }, { name: 'Tema 8' }, { name: 'Tema 8' }],
    },
    {
      name: 'Lorena Recalde',
      email: 'autor5@example.com',
      affiliation: 'Escuela superios del ejercito ESPE',
      num_articles: 7,
      topics: [{ name: 'Artificial intelligence' }, { name: 'data cience' }, { name: 'Machine Learning' }, { name: 'Artificial intelligence' }, { name: 'data cience' }, { name: 'Machine Learning' }],
    },
  ];
}
