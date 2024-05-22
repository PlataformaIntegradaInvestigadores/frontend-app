import { Component } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  authorsCount:number = 38000;
  articlesCount:number = 100000;
  topicsCount:number = 39225;
}
