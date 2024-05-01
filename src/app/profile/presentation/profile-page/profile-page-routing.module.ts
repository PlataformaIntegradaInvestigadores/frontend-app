import { NgModule } from '@angular/core';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ListGroupComponent } from '../components/list-group/list-group.component';

const routes: Routes = [
  {
    path: 'my-groups',
    component: ListGroupComponent
  },
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
