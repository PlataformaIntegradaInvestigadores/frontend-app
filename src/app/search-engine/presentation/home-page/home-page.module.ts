import { NgModule } from '@angular/core';
import { AuthorListComponent } from './pages/author-list/author-list.component';
import { HomePageRoutingModule } from './home-page-rounting.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import { SharedModule } from 'src/app/shared/shared.module';
import {AuthorInformationComponent} from "./components/author-information/author-information.component";
import {AuthorTopicsComponent} from "./components/author-topics/author-topics.component";
import {CommonModule, NgForOf} from "@angular/common";
import { NavbarComponent } from './components/navbar/navbar.component';
import { AnaliticaComponent } from './components/analitica/analitica.component';

@NgModule({
    imports: [HomePageRoutingModule, MatSlideToggleModule, SharedModule, CommonModule],
  exports: [],
  declarations: [
    AuthorListComponent,
    HomePageComponent,
    HeaderComponent,
    NavbarComponent,
    AnaliticaComponent,
    AuthorInformationComponent,
    AuthorTopicsComponent
  ],
  providers: [],
})
export class HomePageModule { }
