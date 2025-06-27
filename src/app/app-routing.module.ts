import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { RedirectComponent } from './auth/presentation/redirect/redirect.component';
import { AuthRedirectGuard } from 'src/guards/auth-redirect.guard';
// import { DebateChatComponent } from './consensus/presentation/components/debate-chat/debate-chat.component';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
};
const routes: Routes = [
  {
    path: 'login',
    component: RedirectComponent,
    canActivate: [AuthRedirectGuard]
  },
  {
    path: 'register',
    component: RedirectComponent,
    canActivate: [AuthRedirectGuard]
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
  {
    path: 'jobs/:id',
    loadChildren: () => import('src/app/jobs/jobs-page.module').then(m => m.JobsPageModule)
  },
  {
    path: 'company/:id',
    loadChildren: () => import('src/app/profile-company/profile-company.module').then(m => m.ProfileCompanyPageModule)
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
