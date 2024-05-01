import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'groups',
    loadChildren:() => import('./group/group-page-routing.module').then(m => m.GroupPageRoutingModule)
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
