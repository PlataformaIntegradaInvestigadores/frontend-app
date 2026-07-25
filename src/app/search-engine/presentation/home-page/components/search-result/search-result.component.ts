import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Search} from "../../../../../shared/interfaces/search-type.interface";
import {ActivatedRoute} from "@angular/router";
import {Title} from '@angular/platform-browser';
import {VisualsService} from "../../../../../shared/domain/services/visuals.service";
import {DashboardCounts, Word} from "../../../../../shared/interfaces/dashboard.interface";
import {query} from "@angular/animations";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  showComponent: boolean = true
  searchValue!: Search
  setSearch!: Search
  loading: boolean = false
  public countsLoaded: boolean = false;
  public topicsLoaded: boolean = false;

  counts!: DashboardCounts
  words!: Word[]
  provinces: string = environment.apiCentinela + '/v1/dashboard/province/get_provinces/'


  constructor(private route: ActivatedRoute, private changeDetector: ChangeDetectorRef, private title: Title, private visualsService: VisualsService) {
    const {option, query} = route.snapshot.queryParams
    if (option && query){
      this.setSearch = {option, query}
    }
    this.searchValue = {option: 'au', query: ''}
  }

  onSearch(searchValue: Search) {
    this.searchValue = {
      ...searchValue,
      query: searchValue.query.trim().replace(/\s\s+/g, ' ')
    };
  }

  yearSelected(years: number[]) {
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    this.title.setTitle("Welcome")
    this.visualsService.getCounts().subscribe(data => {
      this.counts = data;
      this.countsLoaded = true;
    });
    this.visualsService.getTopics(100).subscribe(data => {
      this.words = data;
      this.topicsLoaded = true;
    });
  }

  topicClcked(se: Search) {
    this.setSearch = {'option': se.option, 'query': se.query}
    this.onSearch(se)

  }

  isAuthorSearch(){
    return this.searchValue.option === 'au'
  }
}
