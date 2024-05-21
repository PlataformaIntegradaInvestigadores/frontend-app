import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'member-delete-btn',
  templateUrl: './member-delete-btn.component.html',
  styleUrls: ['./member-delete-btn.component.css']
})
export class MemberDeleteBtnComponent implements OnInit{
  ngOnInit(): void {
    initFlowbite();
  }

}
