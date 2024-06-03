import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserDataService } from 'src/app/profile/domain/entities/user_data.service';


@Component({
  selector: 'app-data-nav',
  templateUrl: './data-nav.component.html',
  styleUrls: ['./data-nav.component.css']
})
export class DataNavComponent implements OnChanges {
  @Input() user: any;

  constructor(private userDataService: UserDataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.userDataService.changeUser(this.user);
    }
  }
}
