import {Component, Input} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-analitica',
  templateUrl: './analitica.component.html',
  styleUrls: ['./analitica.component.css']
})
export class AnaliticaComponent {
  @Input()
  code!: String;

  constructor(private title:Title){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.title.setTitle("Analytics")
  }
}
