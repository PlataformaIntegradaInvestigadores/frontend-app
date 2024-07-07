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
    '1. Interpretability and Explainability of AI Models',
      '2. Development of Contextual Recommendation Systems', 
      '3. Computer Vision Applications in Agriculture', 
      '4. Automation of Neural Network Design',
      '5. Privacy-Enhancing Technologies',
      '6. AI for Real-Time Emotion Analysis'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

}
