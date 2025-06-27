import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedPageComponent } from './presentation/pages/feed-page.component';
import { loginGuard } from 'src/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: FeedPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedsRoutingModule { }
