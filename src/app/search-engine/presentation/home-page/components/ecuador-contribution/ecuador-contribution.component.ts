import {Component, EventEmitter, Output} from '@angular/core';
import {Search} from "../../../../../shared/interfaces/search-type.interface";

@Component({
  selector: 'app-ecuador-contribution',
  templateUrl: './ecuador-contribution.component.html',
  styleUrls: ['./ecuador-contribution.component.css']
})
export class EcuadorContributionComponent {
  @Output()
  t:EventEmitter<Search> = new EventEmitter<Search>();


  emitT(top: string){
    const search: Search = {'option':'mrar', 'query': top}

    this.t.emit(search)
  }

}
