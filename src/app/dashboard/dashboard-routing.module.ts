import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {GeneralComponent} from "./presentation/pages/general/general.component";
import {AffiliationComponent} from "./presentation/pages/affiliation/affiliation.component";
import {TopicComponent} from "./presentation/pages/topic/topic.component";
import {DashboardPageComponent} from "./presentation/pages/dashboard-page/dashboard-page.component";


const routes: Routes =[
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    children: [
      {
        path: '',
        component: GeneralComponent,
      },
      {
        path: 'affiliation',
        component: AffiliationComponent,
      },
      {
        path: 'topic',
        component: TopicComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
