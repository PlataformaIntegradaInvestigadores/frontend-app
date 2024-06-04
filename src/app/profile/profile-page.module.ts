import { NgModule } from '@angular/core';
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfileComponent } from './presentation/pages/profile-page/profile.component';
import { ProfileDataComponent } from './presentation/components/profile-data/profile-data.component';
import { DataNavComponent } from './presentation/components/data-nav/data-nav.component';
import { CardGroupComponent } from './presentation/components/card-group/card-group.component';
import { ListGroupComponent } from './presentation/components/list-group/list-group.component';
import { BtnCreateGroupComponent } from './presentation/components/btn-create-group/btn-create-group.component';
import { SharedModule } from '../shared/shared.module';
import { DropdownBtnComponent } from './presentation/components/dropdown-btn/dropdown-btn.component';
import { CommonModule } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { D3Service } from "../shared/d3";
import { DataFormComponent } from './presentation/components/data-form/data-form.component';
import { FormsModule } from '@angular/forms';
import { AboutMeComponent } from './presentation/components/aboutme/aboutme.component';
import { PostComponent } from './presentation/components/aboutme/post/post.component';
import { InformationComponent } from './presentation/components/aboutme/information/information.component';

@NgModule({
  imports: [ProfilePageRoutingModule, SharedModule, CommonModule, CdkMenuTrigger, CdkMenu, CdkMenuItem, FormsModule],
  exports: [ProfileDataComponent],
  declarations: [
    ProfileComponent,
    AboutMeComponent,
    PostComponent,
    InformationComponent,
    ProfileDataComponent,
    DataNavComponent,
    CardGroupComponent,
    ListGroupComponent,
    BtnCreateGroupComponent,
    DropdownBtnComponent,
    DataFormComponent,

  ],
  providers: [D3Service],
})
export class ProfilePageModule { }
