import {Component, Input} from '@angular/core';
import {Author, Topic} from "../../../../../shared/interfaces/author.interface";

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent {
  authors:Author[]=[
    {
      name: "Autor 1",
      email: "autor1@example.com",
      affiliation: "Afiliación 1",
<<<<<<< HEAD
      num_articles: 10,
      topics: [{ name: "Tema 1" }, { name: "Tema 2" }]
=======
      numero_articulos: 10,
      topics: [{ name: "Tema 1" }, { name: "Tema 2" }, { name: "Tema 8" }]
>>>>>>> 00381adc8022f8e4a4291c347b7af4a6560b8870
    },
    {
      name: "Autor 2",
      email: "autor2@example.com",
      affiliation: "Afiliación 2",
<<<<<<< HEAD
      num_articles: 5,
      topics: [{ name: "Tema 3" }, { name: "Tema 4" }]
=======
      numero_articulos: 5,
      topics: [{ name: "Tema 3" }, { name: "Tema 4" } , { name: "Tema 8" }]
>>>>>>> 00381adc8022f8e4a4291c347b7af4a6560b8870
    },
    {
      name: "Autor 3",
      email: "autor3@example.com",
      affiliation: "Afiliación 3",
<<<<<<< HEAD
      num_articles: 8,
      topics: [{ name: "Tema 5" }, { name: "Tema 6" }]
=======
      numero_articulos: 8,
      topics: [{ name: "Tema 5" }, { name: "Tema 6" } , { name: "Tema 8" }]
>>>>>>> 00381adc8022f8e4a4291c347b7af4a6560b8870
    },
    {
      name: "Autor 4",
      email: "autor4@example.com",
      affiliation: "Afiliación 4",
<<<<<<< HEAD
      num_articles: 12,
      topics: [{ name: "Tema 7" }, { name: "Tema 8" }]
=======
      numero_articulos: 12,
      topics: [{ name: "Tema 7" }, { name: "Tema 8" } , { name: "Tema 8" }]
>>>>>>> 00381adc8022f8e4a4291c347b7af4a6560b8870
    },
    {
      name: "Autor 5",
      email: "autor5@example.com",
      affiliation: "Afiliación 5",
<<<<<<< HEAD
      num_articles: 7,
      topics: [{ name: "Tema 9" }, { name: "Tema 10" }]
=======
      numero_articulos: 7,
      topics: [{ name: "Tema 9" }, { name: "Tema 10" }, { name: "Tema 8" }]
>>>>>>> 00381adc8022f8e4a4291c347b7af4a6560b8870
    }
  ];



}
