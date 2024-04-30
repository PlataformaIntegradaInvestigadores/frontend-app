import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/presentation/login/login.component';
import { RegisterComponent } from './auth/presentation/register/register.component';
import { ProfileComponent } from './profile/presentation/profile/profile.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path:'home',
    loadChildren:() => import('src/app/search-engine/presentation/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path:'**', // Redirects to home when the route is not correct
    redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
