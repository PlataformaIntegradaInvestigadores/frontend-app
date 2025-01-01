import { NgModule } from "@angular/core";
import { ConsensusRoutingModule } from "./consensus-routing.module";
import { Phase1ConsensusComponent } from './presentation/components/phase1-consensus/phase1-consensus.component';
import { Phase2ConsensusComponent } from './presentation/components/phase2-consensus/phase2-consensus.component';
import { Phase3ConsensusComponent } from './presentation/components/phase3-consensus/phase3-consensus.component';
import { NavbarConsensusComponent } from './presentation/components/navbar-consensus/navbar-consensus.component';
import { Phase1ConsensusNotificationComponent } from './presentation/components/phase1-consensus-notification/phase1-consensus-notification.component';
import { MembersConsensusComponent } from './presentation/components/members-consensus-card-list/members-consensus.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ConsensusPageComponent } from './presentation/pages/consensus-page/consensus-page.component';
import { CommonModule } from "@angular/common";
import { ViewAllMembersComponent } from "./presentation/components/view-all-members/view-all-members.component";
import { MemberItemComponent } from './presentation/components/member-item/member-item.component';
import { MemberDeleteBtnComponent } from './presentation/components/member-delete-btn/member-delete-btn.component';
import { UniqueIDDirective } from "./presentation/components/directives/unique-id.directive";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { BtnMailComponent } from './presentation/components/btn-mail/btn-mail.component';
import { SatisfactionLevelComponent } from './presentation/components/satisfaction-level/satisfaction-level.component';
import { ProfilePageModule } from "../profile/profile-page.module";
import { Phase2ConsensusNotificationComponent } from './presentation/components/phase2-consensus-notification/phase2-consensus-notification.component';
import { Phase3ConsensusNotificationComponent } from './presentation/components/phase3-consensus-notification/phase3-consensus-notification.component';
import { MsgOnboardingComponent } from './presentation/components/msg-onboarding/msg-onboarding.component';
import { AdminOptionsComponent } from './presentation/components/admin-options/admin-options.component';


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
    UniqueIDDirective,
    BtnMailComponent,
    SatisfactionLevelComponent,
    Phase2ConsensusNotificationComponent,
    Phase3ConsensusNotificationComponent,
    MsgOnboardingComponent,
  ],
  imports: [ConsensusRoutingModule, CommonModule, SharedModule, FormsModule, AdminOptionsComponent],
  exports: [MemberDeleteBtnComponent, UniqueIDDirective, Phase1ConsensusComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsensusModule {
}
