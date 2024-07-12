import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PhaseStateService } from 'src/app/consensus/domain/services/phaseState.service';

@Component({
  selector: 'navbar-consensus',
  templateUrl: './navbar-consensus.component.html',
  styleUrls: ['./navbar-consensus.component.css']
})
export class NavbarConsensusComponent implements OnInit, OnDestroy {
  currentPhase: number = 0;
  private phaseSubscription: Subscription | undefined;;
  private routerSubscription: Subscription | undefined;;
  private groupId: string | null = null;

  constructor(
    private phaseStateService: PhaseStateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(() => {
      this.groupId = this.route.snapshot.paramMap.get('groupId');
      if (this.groupId) {
        const storedPhase = this.phaseStateService.getPhase(this.groupId);
        this.currentPhase = storedPhase;
        this.phaseStateService.setPhase(storedPhase, this.groupId);
      }
    });

    this.phaseSubscription = this.phaseStateService.phase$.subscribe(phase => {
      this.currentPhase = phase;
    });
  }

  ngOnDestroy(): void {
    if (this.phaseSubscription) {
      this.phaseSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
