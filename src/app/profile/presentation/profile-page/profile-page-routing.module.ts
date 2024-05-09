import { NgModule } from '@angular/core';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ListGroupComponent } from '../components/list-group/list-group.component';
import { AboutmeComponent } from '../components/aboutme/aboutme.component';
import { NetworkComponent } from '../components/network/network.component';
import { ContactComponent } from '../components/contact/contact.component';
import { ArticleComponent } from '../components/article/article.component';
import { FingerprintComponent } from '../components/fingerprint/fingerprint.component';

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
    children: [
      {
        path: 'about-me',
        component: AboutmeComponent
      },
      {
        path: 'network',
        component: NetworkComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'article',
        component: ArticleComponent
      },
      {
        path: 'fingerprint',
        component: FingerprintComponent
      },
      {
        path: 'my-groups',
        component: ListGroupComponent
      },
    ]
  },
  {
    path: 'my-groups/:idGroup',
    loadChildren: () => import('src/app/consensus/consensus.module').then(m => m.ConsensusModule)
  },
  { 
    path: '', 
    redirectTo: 'about-me', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: 'about-me', 
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [],
})
export class ProfilePageRoutingModule { }
