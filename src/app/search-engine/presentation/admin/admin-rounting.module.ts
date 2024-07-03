import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./pages/login/admin.component";
import { AdminDashboardComponent } from "./pages/admin-dashboard/admin-dashboard.component";
import { CorpusComponent } from "./components/corpus/corpus.component";
import { ModelsComponent } from "./components/models/models.component";
import { MainContentComponent } from "./components/main-content/main-content.component";

const routes: Routes = [
  {
    path:'',
    component:AdminComponent
  },
  {
    path:'dashboard',
    component:AdminDashboardComponent,
    children:[
      {
       path:'main-content',
       component:MainContentComponent
      },
      {
        path:'generate-corpus',
        component:CorpusComponent
      },
      {
        path:'generate-model',
        component:ModelsComponent
      },
      {
        path:'',
        redirectTo:'main-content',
        pathMatch:'full'
      }
    ]
  },

]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [],
})
export class AdminRoutingModule { }
