import { NgModule } from '@angular/core';
import { AuthorListComponent } from './pages/author-list/author-list.component';
import { HomePageRoutingModule } from './home-page-rounting.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  imports: [HomePageRoutingModule],
  exports: [],
  declarations: [
    AuthorListComponent,
    HomePageComponent,
    HeaderComponent
  ],
  providers: [],
})
export class HomePageModule { }
