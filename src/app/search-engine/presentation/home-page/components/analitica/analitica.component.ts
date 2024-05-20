import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-analitica',
  templateUrl: './analitica.component.html',
  styleUrls: ['./analitica.component.css']
})
export class AnaliticaComponent {
  @Input()
  code!: String;
}
