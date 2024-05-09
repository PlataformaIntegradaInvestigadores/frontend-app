import { NgModule } from '@angular/core';
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfileComponent } from './profile-page/pages/profile/profile.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ProfileDataComponent } from './profile-page/components/profile-data/profile-data.component';
import { DataNavComponent } from './profile-page/components/data-nav/data-nav.component';
import { CardGroupComponent } from './components/card-group/card-group.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { BtnCreateGroupComponent } from './components/btn-create-group/btn-create-group.component';


@NgModule({
  imports: [ProfilePageRoutingModule],
  exports: [HeaderComponent, ProfileDataComponent],
  declarations: [
    ProfileComponent,
    HeaderComponent,
    ProfileDataComponent,
    DataNavComponent,
    CardGroupComponent,
    ListGroupComponent,
    BtnCreateGroupComponent
  ],
  providers: [],
})
export class ProfilePageModule { }
