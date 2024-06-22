import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { SharedModule } from '../shared/shared.module';

import { D3Service } from '../shared/d3';

import { ProfileComponent } from './presentation/pages/profile-page/profile.component';
import { AboutMeComponent } from './presentation/components/aboutme/aboutme.component';
import { InformationComponent } from './presentation/components/aboutme/information/information.component';
import { PostComponent } from './presentation/components/aboutme/post/post.component';

import { ProfileDataComponent } from './presentation/components/profile-data/profile-data.component';
import { DataNavComponent } from './presentation/components/data-nav/data-nav.component';
import { DropdownBtnComponent } from './presentation/components/dropdown-btn/dropdown-btn.component';
import { DataFormComponent } from './presentation/components/data-form/data-form.component';
import { ContactInfoComponent } from './presentation/components/aboutme/information/components/contact-info/contact-info.component';
import { DisciplinesComponent } from './presentation/components/aboutme/information/components/disciplines/disciplines.component';
import { AboutMeProfileComponent } from './presentation/components/aboutme/information/components/about-me-profile/about-me-profile.component';
import { PostInputComponent } from './presentation/components/aboutme/post/components/post-input/post-input.component';
import { PostListComponent } from './presentation/components/aboutme/post/components/post-list/post-list.component';
import { PostItemComponent } from './presentation/components/aboutme/post/components/post-item/post-item.component';
import { CardGroupComponent } from '../group/presentation/card-group/card-group.component';
import { BtnCreateGroupComponent } from '../group/presentation/btn-create-group/btn-create-group.component';
import { ListGroupComponent } from '../group/presentation/list-group/list-group.component';
import { GroupCreateModalComponent } from '../group/presentation/group-create-modal/group-create-modal.component';

@NgModule({
  declarations: [
    ProfileComponent,
    AboutMeComponent,
    PostComponent,
    InformationComponent,
    ProfileDataComponent,
    DataNavComponent,
    DropdownBtnComponent,
    DataFormComponent,
    ContactInfoComponent,
    DisciplinesComponent,
    AboutMeProfileComponent,
    PostInputComponent,
    PostListComponent,
    PostItemComponent,
    CardGroupComponent,
    ListGroupComponent,
    BtnCreateGroupComponent,
    GroupCreateModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ProfilePageRoutingModule,
    SharedModule,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
  ],
  providers: [D3Service],
  exports: [ProfileDataComponent],
})
export class ProfilePageModule { }
