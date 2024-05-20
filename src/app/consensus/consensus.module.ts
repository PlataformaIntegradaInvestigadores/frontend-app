import { NgModule } from "@angular/core";
import { ConsensusRoutingModule } from "./consensus-routing.module";
import { Phase1ConsensusComponent } from './presentation/components/phase1-consensus/phase1-consensus.component';
import { Phase2ConsensusComponent } from './presentation/components/phase2-consensus/phase2-consensus.component';
import { Phase3ConsensusComponent } from './presentation/components/phase3-consensus/phase3-consensus.component';
import { NavbarConsensusComponent } from './presentation/components/navbar-consensus/navbar-consensus.component';
import { Phase1ConsensusNotificationComponent } from './presentation/components/phase1-consensus-notification/phase1-consensus-notification.component';
import { MembersConsensusComponent } from './presentation/components/members-consensus-card-list/members-consensus.component';
import { ProfilePageModule } from "../profile/profile-page.module";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ConsensusPageComponent } from './presentation/pages/consensus-page/consensus-page.component';
import { CommonModule } from "@angular/common";
import { ViewAllMembersComponent } from "./presentation/components/view-all-members/view-all-members.component";
import { MemberItemComponent } from './presentation/components/member-item/member-item.component';
import { MemberDeleteBtnComponent } from './presentation/components/member-delete-btn/member-delete-btn.component';
import { UniqueIDDirective } from "./presentation/components/directives/unique-id.directive";


@NgModule({
    declarations: [
    Phase1ConsensusComponent,
    /* Phase2ConsensusComponent, */
    Phase3ConsensusComponent,
    NavbarConsensusComponent,
    Phase1ConsensusNotificationComponent,
    MembersConsensusComponent,
    ConsensusPageComponent,
    ViewAllMembersComponent,
    MemberItemComponent,
    MemberDeleteBtnComponent,
    UniqueIDDirective
  ],
    imports: [ConsensusRoutingModule, ProfilePageModule, CommonModule],
    exports: [MemberDeleteBtnComponent, UniqueIDDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsensusModule {
}