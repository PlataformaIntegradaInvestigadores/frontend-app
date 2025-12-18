import {
  ChangeDetectorRef,
  Component,
  OnInit,
  AfterContentChecked
} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';

import { VisualsService } from "../../../../../shared/domain/services/visuals.service";
import { Search } from "../../../../../shared/interfaces/search-type.interface";
import { DashboardCounts, Word } from "../../../../../shared/interfaces/dashboard.interface";
import { environment } from "../../../../../../environments/environment";

import { RagApiService } from 'src/app/shared/services/rag-api.service';
import { AskResponse } from 'src/app/shared/interfaces/rag-api.interface';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, AfterContentChecked {
  showComponent: boolean = true;

  searchValue!: Search;
  setSearch!: Search;

  loading: boolean = false;
  public countsLoaded: boolean = false;
  public topicsLoaded: boolean = false;

  // --- IA  ---
  showSummaryOverlay = false;
  aiAnswer?: AskResponse;
  aiLoading = false;
  aiError: string | null = null;

  counts!: DashboardCounts;
  words!: Word[];
  provinces: string = environment.apiCentinela + '/v1/dashboard/province/get_provinces/';

  constructor(
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private title: Title,
    private visualsService: VisualsService,
    private ragApi: RagApiService,
  ) {
    const { option, query } = route.snapshot.queryParams;

    if (option && query) {
      this.setSearch = { option, query };
      this.searchValue = { option, query };

      // Mostrar overlay y disparar IA solo para MRAR / MRAU
      this.showSummaryOverlay = (option === 'mrar' || option === 'mrau');
      if (this.showSummaryOverlay) {
        this.fetchAiSummary(this.searchValue.query, 120);
      }
    } else {
      // estado inicial por defecto
      this.searchValue = { option: 'au', query: '' };
    }
  }

  onSearch(searchValue: Search) {
    this.searchValue = {
      ...searchValue,
      query: searchValue.query.trim().replace(/\s\s+/g, ' ')
    };

    if (this.searchValue.option === 'mrar' || this.searchValue.option === 'mrau') {
      this.fetchAiSummary(this.searchValue.query, 120);
    } else {
      // reset IA si ya no aplica
      this.showSummaryOverlay = false;
      this.aiAnswer = undefined;
      this.aiError = null;
      this.aiLoading = false;
    }
  }

  private fetchAiSummary(query: string, topk: number) {
    this.aiLoading = true;
    this.aiError = null;
    this.showSummaryOverlay = true;

    this.ragApi.ask({ query, topk }).subscribe({
      next: (res) => {
        this.aiAnswer = res;
        this.aiLoading = false;
      },
      error: (err) => {
        this.aiError = (err?.error?.detail || 'Error al consultar IA');
        this.aiLoading = false;
      }
    });
  }

  closeOverlay() {
    this.showSummaryOverlay = false;
  }

  yearSelected(years: number[]) {}

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    this.title.setTitle("Welcome");

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
    this.setSearch = { option: se.option, query: se.query };
    this.onSearch(se);
  }

  isAuthorSearch() {
    return this.searchValue.option === 'au';
  }
}
