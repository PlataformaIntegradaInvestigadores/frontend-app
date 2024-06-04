import { Component } from '@angular/core';

@Component({
  selector: 'app-card-summary',
  templateUrl: './card-summary.component.html',
  styleUrls: ['./card-summary.component.css']
})
export class CardSummaryComponent {
  single = [
    {
      "name": "Authors",
      "value": 89400
    },
    {
      "name": "Articles",
      "value": 100000
    },
    {
      "name": "Knowledge Areas",
      "value": 72000
    },];
  view:[number,number] = [504, 120];
  cardColor: string = '#232837';

  constructor() {
  }

  onSelect(event: any) {
    console.log(event);
  }

  protected readonly Math = Math;
}
