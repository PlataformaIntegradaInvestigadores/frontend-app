import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConsensusPageComponent } from "./presentation/pages/consensus-page/consensus-page.component";
import { Phase1ConsensusComponent } from "./presentation/components/phase1-consensus/phase1-consensus.component";
import { Phase2ConsensusComponent } from "./presentation/components/phase2-consensus/phase2-consensus.component";
import { Phase3ConsensusComponent } from "./presentation/components/phase3-consensus/phase3-consensus.component";
import { PhaseGuard } from "src/guards/phase.guard";
import { ConsensusExitGuard } from "src/guards/consensus-exit.guard";

const routes: Routes = [
    {
        path: "consensus",
        component: ConsensusPageComponent,

        children: [
            {
                path: "recommend-topics",
                component: Phase1ConsensusComponent,
                canActivate: [PhaseGuard],
                data: { expectedPhase: 0 }
            },
            {
                path: "valuation",
                component: Phase2ConsensusComponent,
                canActivate: [PhaseGuard],
                data: { expectedPhase: 1 }
            },
            {
                path: "decision",
                component: Phase3ConsensusComponent,
                canActivate: [PhaseGuard],
                data: { expectedPhase: 2 }
            },
            {
                path: "",
                redirectTo: "recommend-topics",
                pathMatch: "full"
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ConsensusRoutingModule { }
