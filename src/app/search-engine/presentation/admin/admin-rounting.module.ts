import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./pages/login/admin.component";
import { AdminDashboardComponent } from "./pages/admin-dashboard/admin-dashboard.component";
import {  UpdateCentinelaComponent } from "./components/update-centinela/update-centinela.component";
import { ModelsComponent } from "./components/models/models.component";
import { MainContentComponent } from "./components/main-content/main-content.component";
import { loginGuard } from "src/guards/login.guard";

const routes: Routes = [
  {
    path:'',
    component:AdminComponent
  },
  {
    path:'dashboard',
    component:AdminDashboardComponent,
    // canActivate: [loginGuard],
    children:[
      {
       path:'main-content',
       component:MainContentComponent
      },
      {
        path:'update-centinela',
        component:UpdateCentinelaComponent
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
    ],
  },
  {
    path: '**',
    redirectTo: 'admin',
  }

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
