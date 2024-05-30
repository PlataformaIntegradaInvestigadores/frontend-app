// profile-data.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnChanges {
  @Input() user: any;
  mostrarBloqueEnPantallaPequena = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
    }
  }
}
