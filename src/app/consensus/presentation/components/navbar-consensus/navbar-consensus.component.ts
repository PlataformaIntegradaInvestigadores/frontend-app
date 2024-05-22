import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'navbar-consensus',
  templateUrl: './navbar-consensus.component.html',
  styleUrls: ['./navbar-consensus.component.css']
})
export class NavbarConsensusComponent implements OnInit{
  ngOnInit(): void {
    initFlowbite();
  }
}
