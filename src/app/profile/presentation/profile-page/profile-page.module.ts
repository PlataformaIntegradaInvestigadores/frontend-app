import { NgModule } from '@angular/core';
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { CardGroupComponent } from '../components/card-group/card-group.component';
import { ListGroupComponent } from '../components/list-group/list-group.component';


@NgModule({
  imports: [ProfilePageRoutingModule],
  exports: [],
  declarations: [
    ProfileComponent,
    CardGroupComponent,
    ListGroupComponent
  ],
  providers: [],
})
export class ProfilePageModule { }
