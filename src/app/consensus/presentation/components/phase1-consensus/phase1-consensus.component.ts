import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'phase1-consensus',
  templateUrl: './phase1-consensus.component.html',
  styleUrls: ['./phase1-consensus.component.css']
})
export class Phase1ConsensusComponent implements OnInit{

  rangeValues: number[] = [];
  showLabel: boolean[] = [];
  showSliders = false;  // Esta propiedad controlará la visibilidad de las barras de rango
  topics = this.obtenerTopicos();

  constructor() { 
    // Supongamos que obtienes la cantidad de tópicos de alguna manera
    const numeroDeTopicos = this.obtenerTopicos().length;
    this.rangeValues = new Array(numeroDeTopicos).fill(0); // Inicializa todos los rangos en 0
    this.showLabel = new Array(numeroDeTopicos).fill(false); // Inicializa la visibilidad de las etiquetas en false
  } 

  obtenerTopicos(): string[] {
    // Supongamos que obtienes la cantidad de tópicos de alguna manera
    return ['Tópico 1', 'Tópico 2', 'Tópico 3', 'Tópico 4', 'Tópico 5'];
  }

  showLabels(index: number) {
    this.showLabel[index] = true;
  }

  hideLabels(index: number) {
      this.showLabel[index] = false;
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