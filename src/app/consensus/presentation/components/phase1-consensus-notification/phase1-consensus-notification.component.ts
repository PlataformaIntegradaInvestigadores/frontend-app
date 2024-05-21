import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'phase1-consensus-notification',
  templateUrl: './phase1-consensus-notification.component.html',
  styleUrls: ['./phase1-consensus-notification.component.css']
})
export class Phase1ConsensusNotificationComponent implements OnInit{
  ngOnInit(): void {
    initFlowbite();
  }
}
