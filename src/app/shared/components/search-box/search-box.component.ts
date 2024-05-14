import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  faNewspaper,
  faSearch,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { SearchOption, Search, RandItem} from '../../interfaces/search-type.interface';
import {Dropdown, DropdownOptions, initFlowbite} from "flowbite";

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit{

  faSearch = faSearch

  searchOptions: SearchOption[] = [
    {code: 'au', label: 'Autor', placeholder: 'Ej. Lorena Recalde', icon: faUser},
    {code: 'mrau', label: 'Autores relevantes', placeholder: 'Ej. Artificial Intelligence, Covid', icon: faUsers},
    {code: 'mrar', label: 'Artículos relevantes', placeholder: 'Ej. Machine learning', icon: faNewspaper}
  ]

  selectedOption!: SearchOption;
  inputValue: string = ""

  @Output() search: EventEmitter<Search> = new EventEmitter<Search>()
  @Input()
  setSearch!: Search;
  @Input() isLoading: boolean = false

  randItems!: RandItem[];


  constructor() {
    this.setOption(this.searchOptions[0])

  }

  ngOnInit(): void {
    initFlowbite();

    }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['setSearch']?.currentValue) {
      let searchOp = this.searchOptions.find(item => item.code == this.setSearch.option)

      if(searchOp){
        this.setOption(searchOp)
      } else {
        this.setOption(this.searchOptions[1])
      }

      this.inputValue = this.setSearch.query
      this.search.emit({
        option: this.selectedOption.code,
        query: this.inputValue
      })
    }
  }

  onEnter(event: KeyboardEvent) {
    if (event.code === 'Enter')
      this.search.emit({
        option: this.selectedOption.code,
        query: this.inputValue
      })
  }

  setOption(option: SearchOption) {
    this.selectedOption = option
    if (this.selectedOption.code == 'au') {

    } else if (this.selectedOption.code == 'mrau' || this.selectedOption.code == 'mrar') {

    }
  }
}
