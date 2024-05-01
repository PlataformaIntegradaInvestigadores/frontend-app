import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorListComponent } from './pages/author-list/author-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes:Routes =[
  {
    path:"author-list",
    component:AuthorListComponent
  },
  {
    path:'',
    component:HomePageComponent
  },
  {
    path:'**',
    redirectTo:''
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [],
})
export class HomePageRoutingModule { }
