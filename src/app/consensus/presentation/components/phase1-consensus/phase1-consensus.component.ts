import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'phase1-consensus',
  templateUrl: './phase1-consensus.component.html',
  styleUrls: ['./phase1-consensus.component.css']
})
export class Phase1ConsensusComponent implements OnInit{

  rangeValue = 0;
  showLabel = false;

  showLabels() {
    this.showLabel = true;
  }

  hideLabels() {
    this.showLabel = false;
  }

  ngOnInit(): void {
    initFlowbite();
  }
  
  getGradient(value: number): string {
    /* #172554  == hsl(223, 58%, 20%) */
    const hue = 223;  // Tono fijo del color final
    const saturation = 58; // Saturación fija del color final
    // A medida que el valor aumenta, la luminosidad disminuye hacia 20% (oscuro)
    let lightness = 80 - (80 - 20) * (value / 100); // Invertir la interpolación
    return `linear-gradient(90deg, hsl(${hue}, ${saturation}%, ${lightness}%) 0%, hsl(${hue}, ${saturation}%, ${lightness}%) 100%)`;
  }
  
}