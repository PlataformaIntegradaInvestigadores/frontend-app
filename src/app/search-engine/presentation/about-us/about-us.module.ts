import { NgModule } from '@angular/core';
import { AboutUsRoutingModule } from './about-us.routing.module';
import { CommonModule } from '@angular/common';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { AuthorSearchComponent } from './components/author-search/author-search.component';
import { AboutComponent } from './components/about/about.component';


@NgModule({
  imports: [
    AboutUsRoutingModule,
    CommonModule
  ],
  exports: [],
  declarations: [
  GettingStartedComponent,
  AuthorSearchComponent,
  AboutComponent
  ],
  providers: [],
})
export class AboutUsModule { }
