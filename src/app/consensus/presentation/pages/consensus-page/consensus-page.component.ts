import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'consensus-page',
  templateUrl: './consensus-page.component.html',
  styleUrls: ['./consensus-page.component.css']
})
export class ConsensusPageComponent implements OnInit{
  ngOnInit(): void {
    initFlowbite();
  }
}
