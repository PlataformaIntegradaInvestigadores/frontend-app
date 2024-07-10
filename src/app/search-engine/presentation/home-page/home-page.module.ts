import { NgModule } from '@angular/core';
import { AuthorListComponent } from './pages/author-list/author-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthorInformationComponent } from './components/author-information/author-information.component';
import { AuthorTopicsComponent } from './components/author-topics/author-topics.component';
import { CommonModule } from '@angular/common';
import { AnaliticaComponent } from './components/analitica/analitica.component';
import { AuthorRetrieveComponent } from './components/author-retrieve/author-retrieve.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ArticleInformationComponent} from "./components/article-information/article-information.component";
import { SharedRoutingModule } from 'src/app/shared/shared.routing.module';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar.component';
import { CoauthorsGraphComponent } from './components/coauthors-graph/coauthors-graph.component';
import {DashboardModule} from "../../../dashboard/dashboard.module";
import { MostRelevantAuthorsGraphComponent } from './components/most-relevant-authors-graph/most-relevant-authors-graph.component';
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { EcuadorContributionComponent } from './components/ecuador-contribution/ecuador-contribution.component';
import {HttpClientModule} from "@angular/common/http";
import {CountUpModule} from "ngx-countup";
import {LineChartModule} from "@swimlane/ngx-charts";
import {VisualsService} from "../../../shared/domain/services/visuals.service";
import {SummaryComponent} from "./components/summary/summary.component";
import {SuggestionService} from "../../../dashboard/domain/services/suggestion.service";

@NgModule({
    imports: [
        MatSlideToggleModule,
        SharedModule,
        CommonModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        SharedRoutingModule,
        FormsModule,
        FontAwesomeModule,
        SharedModule,
        CountUpModule,
        LineChartModule,
        DashboardModule,
    ],
    exports: [
        CoauthorsGraphComponent,
        SummaryComponent,

    ],
  declarations: [
    AuthorListComponent,
    HomePageComponent,
    AnaliticaComponent,
    AuthorInformationComponent,
    AuthorTopicsComponent,
    AuthorRetrieveComponent,
    SearchResultComponent,
    ArticleInformationComponent,
    ArticlePageComponent,
    FilterSidebarComponent,
    CoauthorsGraphComponent,
    MostRelevantAuthorsGraphComponent,
    EcuadorContributionComponent,
    SummaryComponent
  ],
  providers: [VisualsService,HttpClientModule, SuggestionService],
})
export class HomePageModule {}
