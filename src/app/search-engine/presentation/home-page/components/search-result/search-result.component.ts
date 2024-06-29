import {ChangeDetectorRef, Component} from '@angular/core';
import {Search} from "../../../../../shared/interfaces/search-type.interface";
import {ActivatedRoute} from "@angular/router";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  showComponent: boolean = true

  searchValue!: Search
  setSearch!: Search
  loading: boolean = false

  constructor(private route: ActivatedRoute, private changeDetector: ChangeDetectorRef, private title:Title) {
    const {option, query} = route.snapshot.queryParams
    if (option && query)
      this.setSearch = {option, query}
  }

  onSearch(searchValue: Search) {
    this.searchValue = {
      ...searchValue,
      query: searchValue.query.trim().replace(/\s\s+/g, ' ')
    };
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.title.setTitle("Welcome")
  }

  topicClcked(se:Search){
    this.setSearch = {'option': se.option,'query':se.query}
    this.onSearch(se)

  }
}
