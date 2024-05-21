import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'view-all-members',
  templateUrl: './view-all-members.component.html',
  styleUrls: ['./view-all-members.component.css']
})
export class ViewAllMembersComponent  implements OnInit{
  ngOnInit(): void {
    initFlowbite();
  }
}