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
  showCheckTopics: boolean[] = []; // Esta propiedad controlará la visibilidad de los check tópicos
  topics = this.obtenerTopicos();
  newTopic: string = '';
  userAddedTopicsIndexes: number[] = []; // Indices de los tópicos agregados por el usuario
  combinedChecksState: boolean[] = []; // Estado de los checkboxes combinados
  
  showSliders:boolean = false;  // Esta propiedad controlará la visibilidad de las barras de rango
  enableCombinedSearch: boolean = false;
  showAddTopicForm: boolean = false;

  ngOnInit(): void {
    initFlowbite();
  }

  constructor() { 
    // Supongamos que obtienes la cantidad de tópicos de alguna manera
    const numeroDeTopicos = this.obtenerTopicos().length;
    this.rangeValues = new Array(numeroDeTopicos).fill(0); // Inicializa todos los rangos en 0
    this.showLabel = new Array(numeroDeTopicos).fill(false); // Inicializa la visibilidad de las etiquetas en false
    this.showCheckTopics = new Array(numeroDeTopicos).fill(false); // Inicializa la visibilidad de los tópicos en false
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

  showCheckTopic(index: number) {
    this.showCheckTopics[index] = true;
  }

  hideCheckTopic(index: number) {
    this.showCheckTopics[index] = false;
  } 

  
  getGradient(value: number): string {
    /* #172554  == hsl(223, 58%, 20%) */
    /* #1E3C8B == hsl(227, 65%, 34%) */
    const hue = 227;  // Tono fijo del color final
    const saturation = 65; // Saturación fija del color final
    // A medida que el valor aumenta, la luminosidad disminuye hacia 20% (oscuro)
    let lightness = 80 - (80 - 34) * (value / 100); // Invertir la interpolación
    return `linear-gradient(90deg, hsl(${hue}, ${saturation}%, ${lightness}%) 0%, hsl(${hue}, ${saturation}%, ${lightness}%) 100%)`;
  }

  redirectToGoogleScholar(topic: string): void {
    const query = encodeURIComponent(topic);
    const url = `https://scholar.google.com/scholar?q=${query}`;
    window.open(url, '_blank');
  }

  combinedSearch(): void {
    const selectedTopics = this.topics.filter((_, index) => this.combinedChecksState[index]);
    if (selectedTopics.length > 0) {
      const query = encodeURIComponent(selectedTopics.join(' '));
      const url = `https://scholar.google.com/scholar?q=${query}`;
      window.open(url, '_blank');
    } else {
      alert('Please select at least one topic for a combined search.');
    }
  }

  

  checkAndCombinedSearch(): void {
    if (this.enableCombinedSearch) {
      this.combinedSearch();
    } else {
      /* alert('Enable combined search by checking the box.'); */
      this.enableCombinedSearch = !this.enableCombinedSearch;
    }
  }

  addNewTopic(): void {
    if (this.newTopic.trim()) {
      this.topics.push(this.newTopic.trim());
      this.rangeValues.push(0);
      this.showLabel.push(false);
      this.showCheckTopics.push(false);
      this.userAddedTopicsIndexes.push(this.topics.length - 1); // Agregar el índice del nuevo tópico
      this.newTopic = '';
    }
  }

  removeLastUserAddedTopic(): void {
    if (this.userAddedTopicsIndexes.length > 0) {
      const lastIndex = this.userAddedTopicsIndexes.pop(); // Obtener y eliminar el último índice
      if (lastIndex !== undefined) {
        this.topics.splice(lastIndex, 1);
        this.rangeValues.splice(lastIndex, 1);
        this.showLabel.splice(lastIndex, 1);
        this.showCheckTopics.splice(lastIndex, 1);
        // Actualizar los índices de los tópicos agregados por el usuario
        this.userAddedTopicsIndexes = this.userAddedTopicsIndexes.map(index => index > lastIndex ? index - 1 : index);
      }
    } else {
      alert('No user-added topics to remove.');
    }
  }
  
  toggleExpertise(): void {
    this.showSliders = !this.showSliders;
  }

  toggleAddTopicForm(): void { 
    this.showAddTopicForm = !this.showAddTopicForm;
  }
  
  
}