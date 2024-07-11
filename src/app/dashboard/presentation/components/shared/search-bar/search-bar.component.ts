import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject, Subscription, switchMap} from "rxjs";
import {SuggestionService} from "../../../../domain/services/suggestion.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  private debouncerSubscription?: Subscription;
  searchQuery: string = '';
  affiliations: any[] = [];
  topics: any[] = [];
  provinces: any[] = []
  searchTerms = new Subject<string>();
  showSuggestions: boolean = false;
  @Output()
  entity: EventEmitter<string> = new EventEmitter<string>()
  @Output()
  name: EventEmitter<string> = new EventEmitter<string>()
  @Input()
  code!: string

  constructor(private suggestionService: SuggestionService) {

  }

  ngOnInit() {
    switch (this.code) {
      case "affiliation":
        this.debouncerSubscription = this.searchTerms
          .pipe(
            debounceTime(1000),
            distinctUntilChanged(),
          ).subscribe(query => {
              this.suggestionService.searchAffiliations(query).subscribe(affs => {
                  this.affiliations = affs;
                  this.showSuggestions = true;
                }
              )
            }
          )
        break;
      case "topic":
        break;
      case "province":
        break;
    }
  }

  onSearchChange(query: string): void {
    this.searchTerms.next(query);
  }

  onFocus(): void {
    this.showSuggestions = true;
  }

  onBlur(): void {
    setTimeout(() => this.showSuggestions = false, 200); // Para permitir clics en sugerencias
  }

  emitEntity(entity: string) {
    this.affiliations = []
    this.topics = []
    this.provinces = []
    this.entity.emit(entity)
  }


}
