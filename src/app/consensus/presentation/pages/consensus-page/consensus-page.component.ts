import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  isPhaseTwo: boolean = false;
  group: Group | null = null;
  groupId: string | null = null;
  userId: string | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private consensusService: ConsensusService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
    ) {}

  ngOnInit() {
    initFlowbite();
    this.groupId = this.activatedRoute.snapshot.paramMap.get('groupId'); // Obtén el ID del grupo desde la URL
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    //console.log('Group ID:', this.groupId);
    //console.log('User ID:', this.userId);
    if (this.groupId) {
      this.loadGroup(this.groupId);
    }

    this.router.events.subscribe((event) => {
      this.updateComponentVisibility();
    });
  }


  loadGroup(groupId: string) {
    this.consensusService.getGroupById(groupId).subscribe({
      next: (group) => {
        this.group = group;
        console.log('Group data on Concensus:', this.group); // Imprimir los datos del grupo en la consola
        this.errorMessage = null; // Reset error message if group is loaded successfully
        this.cdr.detectChanges(); // Forzar detección de cambios
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
    this.isDecisionPhase = url.includes(`/profile/${this.userId}/my-groups/${this.groupId}/consensus/decision`);
  }

  onMemberDeleted(memberId: string): void {
    if (this.group && this.group.users) {
      this.group.users = this.group.users.filter(member => member.id !== memberId);
      this.successMessage = 'Member has been removed successfully.';
      this.cdr.detectChanges(); // Forzar detección de cambios
      setTimeout(() => {
        this.successMessage = null; // Ocultar el mensaje después de unos segundos
        this.cdr.detectChanges();
      }, 3000);
    }
  }

}
