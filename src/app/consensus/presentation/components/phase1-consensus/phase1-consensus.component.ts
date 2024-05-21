import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'phase1-consensus',
  templateUrl: './phase1-consensus.component.html',
  styleUrls: ['./phase1-consensus.component.css']
})
export class Phase1ConsensusComponent implements OnInit{
  ngOnInit(): void {
    initFlowbite();
  }
}