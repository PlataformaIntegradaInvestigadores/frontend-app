import { Component, OnInit } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {NgFor} from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'phase2-consensus',
  templateUrl: './phase2-consensus.component.html',
  styleUrls: ['./phase2-consensus.component.css'],
  standalone: true,
  imports: [CdkDropList, NgFor, CdkDrag, CdkDragPlaceholder],
})
export class Phase2ConsensusComponent implements OnInit{
  ngOnInit(): void {
    initFlowbite();
  }

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX - The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

}
