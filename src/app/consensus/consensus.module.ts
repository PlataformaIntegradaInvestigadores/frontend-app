import { NgModule } from "@angular/core";
import { RecommendTopicsPageComponent } from './presentation/pages/recommend-topics-page/recommend-topics-page.component';
import { ValuationPageComponent } from './presentation/pages/valuation-page/valuation-page.component';
import { DecisionPageComponent } from './presentation/pages/decision-page/decision-page.component';
import { ConsensusRoutingModule } from "./consensus-routing.module";

@NgModule({
    declarations: [
    RecommendTopicsPageComponent,
    ValuationPageComponent,
    DecisionPageComponent
  ],
    imports: [ConsensusRoutingModule],
    exports: []
})
export class ConsensusModule {
}