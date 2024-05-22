import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import {Title} from '@angular/platform-browser'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  #title = 'centinela-application-frontend';
  constructor(private title:Title){
  }

  ngOnInit(): void {
    this.title.setTitle("Welcome")
    initFlowbite();
  }


}
