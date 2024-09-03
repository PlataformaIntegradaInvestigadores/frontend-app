import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { AuthorSearchComponent } from './components/author-search/author-search.component';
import { AboutComponent } from './components/about/about.component';



const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    children: [
      {
        path:'getting-started',
        component: GettingStartedComponent
      },
      {
        path:'author-search',
        component: AuthorSearchComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: '',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule {}
