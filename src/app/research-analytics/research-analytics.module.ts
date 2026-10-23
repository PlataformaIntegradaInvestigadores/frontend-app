import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CorpusPageComponent } from './presentation/pages/corpus-page.component';
import { PreparationPageComponent } from './presentation/pages/preparation-page.component';

@NgModule({
  declarations: [CorpusPageComponent, PreparationPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: CorpusPageComponent },
      { path: 'preparation', component: PreparationPageComponent },
    ]),
  ],
})
export class ResearchAnalyticsModule {}
