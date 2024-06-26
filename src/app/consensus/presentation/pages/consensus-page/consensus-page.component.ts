import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'consensus-page',
  templateUrl: './consensus-page.component.html',
  styleUrls: ['./consensus-page.component.css']
})
export class ConsensusPageComponent implements OnInit{
  

  isDecisionPhase: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    initFlowbite();
    this.router.events.subscribe((event) => {
      // Aquí necesitarías verificar el tipo de evento y asegurarte de que es un NavigationEnd, etc.
      // Asegúrate de importar NavigationEnd.
      this.updateComponentVisibility();
    });
  }

  updateComponentVisibility() {
    // Obtén la URL completa como una cadena
    const url = this.router.url;
    // Verifica si la URL corresponde a la fase de decisión
    this.isDecisionPhase = url.includes('/profile/my-groups/1/consensus/decision');
  }
}
