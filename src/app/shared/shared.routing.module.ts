import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "../search-engine/presentation/home-page/pages/home-page/home-page.component";
import { SearchResultComponent } from "../search-engine/presentation/home-page/components/search-result/search-result.component";
import { AnaliticaComponent } from "../search-engine/presentation/home-page/components/analitica/analitica.component";
import { NgModule } from "@angular/core";
import {ArticlePageComponent} from "../search-engine/presentation/home-page/pages/article-page/article-page.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '', // Esta ruta coincide con la página principal
        component: SearchResultComponent, // El componente app-author-retrieve se mostrará solo en la página principal
      },
      {
        path: 'article/:scopusId',
        component: ArticlePageComponent
      },
      {
        path: 'analitica',
        loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about-us',
        loadChildren: () => import('src/app/search-engine/presentation/about-us/about-us.module').then(m => m.AboutUsModule)
      }

    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class SharedRoutingModule {}
