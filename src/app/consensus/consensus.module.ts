import { NgModule } from "@angular/core";
import { RecommendTopicsPageComponent } from './presentation/pages/recommend-topics-page/recommend-topics-page.component';
import { ValuationPageComponent } from './presentation/pages/valuation-page/valuation-page.component';
import { DecisionPageComponent } from './presentation/pages/decision-page/decision-page.component';
import { ConsensusRoutingModule } from "./consensus-routing.module";
import { ProfilePageModule } from "../profile/presentation/profile-page/profile-page.module";
import { Phase1ConsensusComponent } from './presentation/components/phase1-consensus/phase1-consensus.component';
import { Phase2ConsensusComponent } from './presentation/components/phase2-consensus/phase2-consensus.component';
import { Phase3ConsensusComponent } from './presentation/components/phase3-consensus/phase3-consensus.component';
import { NavbarConsensusComponent } from './presentation/components/navbar-consensus/navbar-consensus.component';
import { Phase1ConsensusNotificationComponent } from './presentation/components/phase1-consensus-notification/phase1-consensus-notification.component';
import { MembersConsensusComponent } from './presentation/components/members-consensus/members-consensus.component';

@NgModule({
    declarations: [
    RecommendTopicsPageComponent,
    ValuationPageComponent,
    DecisionPageComponent,
    Phase1ConsensusComponent,
    Phase2ConsensusComponent,
    Phase3ConsensusComponent,
    NavbarConsensusComponent,
    Phase1ConsensusNotificationComponent,
    MembersConsensusComponent,
    
  ],
    imports: [ConsensusRoutingModule, ProfilePageModule],
    exports: []
})
export class ConsensusModule {
}