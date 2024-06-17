import { NgModule } from '@angular/core';
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfileComponent } from './presentation/pages/profile-page/profile.component';
import { ProfileDataComponent } from './presentation/components/profile-data/profile-data.component';
import { DataNavComponent } from './presentation/components/data-nav/data-nav.component';
import { CardGroupComponent } from '../group/presentation/card-group/card-group.component';
import { BtnCreateGroupComponent } from '../group/presentation/btn-create-group/btn-create-group.component';
import { SharedModule } from '../shared/shared.module';
import { DropdownBtnComponent } from './presentation/components/dropdown-btn/dropdown-btn.component';
import { CommonModule } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { D3Service } from "../shared/d3";
import { DataFormComponent } from './presentation/components/data-form/data-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutMeComponent } from './presentation/components/aboutme/aboutme.component';
import { PostComponent } from './presentation/components/aboutme/post/post.component';
import { InformationComponent } from './presentation/components/aboutme/information/information.component';
import { GroupCreateModalComponent } from '../group/presentation/group-create-modal/group-create-modal.component';
import { ListGroupComponent } from '../group/presentation/list-group/list-group.component';
import { ContactInfoComponent } from './presentation/components/aboutme/information/components/contact-info/contact-info.component';
import { DisciplinesComponent } from './presentation/components/aboutme/information/components/disciplines/disciplines.component';
import { AboutMeProfileComponent } from './presentation/components/aboutme/information/components/about-me-profile/about-me-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostInputComponent } from './presentation/components/aboutme/post/components/post-input/post-input.component';
import { PostListComponent } from './presentation/components/aboutme/post/components/post-list/post-list.component';
import { PostItemComponent } from './presentation/components/aboutme/post/components/post-item/post-item.component';

@NgModule({
  imports: [
    ProfilePageRoutingModule,
    SharedModule,
    CommonModule,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
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
    GroupCreateModalComponent,
    AboutMeComponent,
    InformationComponent,
    ContactInfoComponent,
    DisciplinesComponent,
    AboutMeProfileComponent,
    PostInputComponent,
    PostListComponent,
    PostItemComponent,
  ],
  providers: [D3Service],
})
export class ProfilePageModule { }
