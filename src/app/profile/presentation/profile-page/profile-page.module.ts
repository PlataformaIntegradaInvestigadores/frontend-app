import { NgModule } from '@angular/core';
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileDataComponent } from './components/profile-data/profile-data.component';
import { DataNavComponent } from './components/data-nav/data-nav.component';


@NgModule({
  imports: [ProfilePageRoutingModule],
  exports: [],
  declarations: [
    ProfileComponent,
    HeaderComponent,
    ProfileDataComponent,
    DataNavComponent
  ],
  providers: [],
})
export class ProfilePageModule { }
