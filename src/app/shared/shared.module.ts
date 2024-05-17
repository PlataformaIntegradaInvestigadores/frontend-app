import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { HeaderComponent } from './components/header/header.component';
import { SharedRoutingModule } from './shared.routing.module';

@NgModule({
  declarations: [SearchBoxComponent, HeaderComponent],
  exports: [SearchBoxComponent, HeaderComponent],
  imports: [
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    FormsModule,
    CommonModule,
    SharedRoutingModule,
  ],
  providers: [],
})
export class SharedModule {}
