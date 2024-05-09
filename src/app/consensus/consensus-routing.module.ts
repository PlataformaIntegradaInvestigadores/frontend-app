import { NgModule } from "@angular/core";
import { RecommendTopicsPageComponent } from "./presentation/pages/recommend-topics-page/recommend-topics-page.component";
import { RouterModule, Routes } from "@angular/router";
import { ValuationPageComponent } from "./presentation/pages/valuation-page/valuation-page.component";
import { DecisionPageComponent } from "./presentation/pages/decision-page/decision-page.component";

const routes: Routes = [
    {
        
        path: "consensus/recommend-topics",
        component:RecommendTopicsPageComponent 
    },
    {
        path: "consensus/valuation",
        component:ValuationPageComponent 
    },
    {
        path: "consensus/decision",
        component: DecisionPageComponent
    },


    { 
        path: '', 
        redirectTo: 'consensus/recommend-topics', 
        pathMatch: 'full' 
    },
    { 
        path: '**', 
        redirectTo: 'consensus/recommend-topics', 
    }
    
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ConsensusRoutingModule {}