import {Component, Input, OnInit} from '@angular/core';
import {debounce} from "rxjs";
import {DashboardCounts} from "../../../interfaces/dashboard.interface";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit{
  @Input()
  counts!: DashboardCounts;

  ngOnInit(): void {
    console.log(this.counts.author)
  }




}
