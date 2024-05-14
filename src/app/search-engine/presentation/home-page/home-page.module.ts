import { NgModule } from '@angular/core';
import { AuthorListComponent } from './pages/author-list/author-list.component';
import { HomePageRoutingModule } from './home-page-rounting.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthorInformationComponent } from './components/author-information/author-information.component';
import { AuthorTopicsComponent } from './components/author-topics/author-topics.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AnaliticaComponent } from './components/analitica/analitica.component';
import { AuthorRetrieveComponent } from './components/author-retrieve/author-retrieve.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  imports: [
    HomePageRoutingModule,
    MatSlideToggleModule,
    SharedModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  exports: [],
  declarations: [
    AuthorListComponent,
    HomePageComponent,
    HeaderComponent,
    NavbarComponent,
    AnaliticaComponent,
    AuthorInformationComponent,
    AuthorTopicsComponent,
    AuthorRetrieveComponent,
    SearchResultComponent,
  ],
  providers: [],
})
export class HomePageModule {}
