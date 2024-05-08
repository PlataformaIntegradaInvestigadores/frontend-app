import { NgModule } from '@angular/core';
import { AuthorListComponent } from './pages/author-list/author-list.component';
import { HomePageRoutingModule } from './home-page-rounting.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import { SharedModule } from 'src/app/shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AnaliticaComponent } from './components/analitica/analitica.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [HomePageRoutingModule, MatSlideToggleModule, SharedModule, RouterModule, CommonModule],
  exports: [],
  declarations: [
    AuthorListComponent,
    HomePageComponent,
    HeaderComponent,
    NavbarComponent,
    AnaliticaComponent
  ],
  providers: [],
})
export class HomePageModule { }
