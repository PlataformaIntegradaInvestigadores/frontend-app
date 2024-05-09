import { NgModule } from '@angular/core';
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfileComponent } from './presentation/pages/profile-page/profile.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ProfileDataComponent } from './presentation/components/profile-data/profile-data.component';
import { DataNavComponent } from './presentation/components/data-nav/data-nav.component';
import { CardGroupComponent } from './presentation/components/card-group/card-group.component';
import { ListGroupComponent } from './presentation/components/list-group/list-group.component';
import { BtnCreateGroupComponent } from './presentation/components/btn-create-group/btn-create-group.component';


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
