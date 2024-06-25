import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ConsensusService } from 'src/app/consensus/domain/services/GetGroupDataService.service';
import { Group } from 'src/app/group/domain/entities/group.interface';


@Component({
  selector: 'consensus-page',
  templateUrl: './consensus-page.component.html',
  styleUrls: ['./consensus-page.component.css']
})
export class ConsensusPageComponent implements OnInit{
  

  isDecisionPhase: boolean = false;
  groupId: string | null = null;
  group: Group | null = null;
  errorMessage: string | null = null;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private consensusService: ConsensusService 
    ) {}

  ngOnInit() {
    initFlowbite();
    this.groupId = this.activatedRoute.snapshot.paramMap.get('groupId'); // Obtén el ID del grupo desde la URL

    console.log('Group ID:', this.groupId);

    if (this.groupId) {
      this.loadGroup(this.groupId);
    }

    this.router.events.subscribe((event) => {
      // Aquí necesitarías verificar el tipo de evento y asegurarte de que es un NavigationEnd, etc.
      // Asegúrate de importar NavigationEnd.
      this.updateComponentVisibility();
    });
  }


  loadGroup(groupId: string) {
    this.consensusService.getGroupById(groupId).subscribe({
      next: (group) => {
        this.group = group;
        console.log('Group data:', this.group); // Imprimir los datos del grupo en la consola
        this.errorMessage = null; // Reset error message if group is loaded successfully
      },
      error: (error) => {
        console.error('Error fetching group:', error);
        this.errorMessage = 'You do not have permission to access this group.'; // Set error message
      }
    });
  }

  updateComponentVisibility() {
    // Obtén la URL completa como una cadena
    const url = this.router.url;
    // Verifica si la URL corresponde a la fase de decisión
    this.isDecisionPhase = url.includes('/profile/my-groups/1/consensus/decision');
  }
}
