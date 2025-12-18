import {Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges} from '@angular/core';
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
  folded:boolean = true

  changeStateDropdown(){
    this.folded = !this.folded;
  }

  searchOptions: SearchOption[] = [
    {code: 'au', label: 'Author', placeholder: 'Ej. Lorena Recalde', icon: faUser},
    {code: 'mrau', label: 'Relevant Authors', placeholder: 'Ej. Artificial Intelligence, Covid', icon: faUsers},
    {code: 'mrar', label: 'Relevant Articles', placeholder: 'Ej. Machine learning', icon: faNewspaper}
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
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container') && !target.closest('.dropdown-button')) {
      this.folded = true;
    }
  }
  setOption(option: SearchOption) {
    this.selectedOption = option
    if (this.selectedOption.code == 'au') {

    } else if (this.selectedOption.code == 'mrau' || this.selectedOption.code == 'mrar') {

    }
  }
}
