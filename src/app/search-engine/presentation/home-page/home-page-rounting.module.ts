import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorListComponent } from './pages/author-list/author-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AnaliticaComponent } from './components/analitica/analitica.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

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
        path: 'analitica',
        component: AnaliticaComponent,
      },
      {
        path: 'author-list',
        component: AuthorListComponent,
      },
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
export class HomePageRoutingModule {}
