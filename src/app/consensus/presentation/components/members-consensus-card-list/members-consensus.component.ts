import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'members-consensus',
  templateUrl: './members-consensus.component.html',
  styleUrls: ['./members-consensus.component.css']
})
export class MembersConsensusComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}