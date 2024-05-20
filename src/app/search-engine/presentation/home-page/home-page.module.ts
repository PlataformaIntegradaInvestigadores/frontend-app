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

@NgModule({
  imports: [
    MatSlideToggleModule,
    SharedModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    SharedRoutingModule
  ],
  exports: [],
  declarations: [
    AuthorListComponent,
    HomePageComponent,
    AnaliticaComponent,
    AuthorInformationComponent,
    AuthorTopicsComponent,
    AuthorRetrieveComponent,
    SearchResultComponent,
    ArticleInformationComponent
  ],
  providers: [],
})
export class HomePageModule {}
