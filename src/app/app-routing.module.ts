import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'home',
    loadChildren:() => import('src/app/search-engine/presentation/home-page/home-page.module').then(m => m.HomePageModule)

  },
  {
    path:'**', // Redirects to home when the route is not correct
    redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
