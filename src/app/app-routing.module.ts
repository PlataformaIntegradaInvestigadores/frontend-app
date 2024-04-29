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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
