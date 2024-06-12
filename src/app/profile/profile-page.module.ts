import { NgModule } from '@angular/core';
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfileComponent } from './presentation/pages/profile-page/profile.component';
import { ProfileDataComponent } from './presentation/components/profile-data/profile-data.component';
import { DataNavComponent } from './presentation/components/data-nav/data-nav.component';
import { CardGroupComponent } from './presentation/components/card-group/card-group.component';
import { ListGroupComponent } from './presentation/components/list-group/list-group.component';
import { BtnCreateGroupComponent } from './presentation/components/btn-create-group/btn-create-group.component';
import { SharedModule } from '../shared/shared.module';
import {AuthorService} from "../search-engine/domain/services/author.service";
import {D3Service} from "../shared/d3";

@NgModule({
  imports: [ProfilePageRoutingModule, SharedModule],
  exports: [ProfileDataComponent],
  declarations: [
    ProfileComponent,
    ProfileDataComponent,
    DataNavComponent,
    CardGroupComponent,
    ListGroupComponent,
    BtnCreateGroupComponent
  ],
  providers: [D3Service],
})
export class ProfilePageModule { }
