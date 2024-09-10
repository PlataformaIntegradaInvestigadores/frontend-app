import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/presentation/login/login.component';
import { RegisterComponent } from './auth/presentation/register/register.component';

const routerOptions:ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
};
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/search-engine/presentation/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import("src/app/search-engine/presentation/admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('src/app/profile/profile-page.module').then(m => m.ProfilePageModule)
  },

  /* Siempre al ultimo */
  {
    path: '**', // Redirects to home when the route is not correct
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
