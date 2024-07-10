import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "../search-engine/presentation/admin/pages/login/admin.component";
import {
  AdminDashboardComponent
} from "../search-engine/presentation/admin/pages/admin-dashboard/admin-dashboard.component";
import {loginGuard} from "../../guards/login.guard";
import {MainContentComponent} from "../search-engine/presentation/admin/components/main-content/main-content.component";
import {CorpusComponent} from "../search-engine/presentation/admin/components/corpus/corpus.component";
import {ModelsComponent} from "../search-engine/presentation/admin/components/models/models.component";
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
