import { NgModule } from '@angular/core';
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  imports: [ProfilePageRoutingModule],
  exports: [],
  declarations: [
    ProfileComponent
  ],
  providers: [],
})
export class ProfilePageModule { }
