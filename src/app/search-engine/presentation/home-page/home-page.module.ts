import { NgModule } from '@angular/core';
import { AuthorListComponent } from './pages/author-list/author-list.component';
import { HomePageRoutingModule } from './home-page-rounting.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [HomePageRoutingModule, MatSlideToggleModule, SharedModule],
  exports: [],
  declarations: [
    AuthorListComponent,
    HomePageComponent,
    HeaderComponent
  ],
  providers: [],
})
export class HomePageModule { }
