import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {GeneralComponent} from "./presentation/pages/general/general.component";
import {AffiliationComponent} from "./presentation/pages/affiliation/affiliation.component";


const routes: Routes =[
  {
    path: 'general',
    component: GeneralComponent,
    children: [
      {
        path: 'affiliation',
        component: AffiliationComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'general' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
