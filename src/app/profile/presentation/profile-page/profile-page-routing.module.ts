import { NgModule } from '@angular/core';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [],
})
export class ProfilePageRoutingModule { }
