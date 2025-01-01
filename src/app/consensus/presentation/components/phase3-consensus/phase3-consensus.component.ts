import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConsensusResult } from 'src/app/consensus/domain/entities/consensus-result.interface';
import { TopicService } from 'src/app/consensus/domain/services/TopicDataService.service';
import { WebSocketPhase3Service } from 'src/app/consensus/domain/services/websocket-phase3.service';

@Component({
  selector: 'phase3-consensus',
  templateUrl: './phase3-consensus.component.html',
  styleUrls: ['./phase3-consensus.component.css']
})
export class Phase3ConsensusComponent implements OnInit, OnDestroy {

  groupId: string = '';
  consensusResults: ConsensusResult[] = [];
  private wsSubscription: Subscription | undefined;
  activeConnections: number = 0;
  showResults: boolean = false;
  isDraw: boolean = false;
  userId: string = "";

  constructor(
    private topicDataService: TopicService,
    private route: ActivatedRoute,
    private webSocketService: WebSocketPhase3Service,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.groupId = params.get('groupId') || '';
      this.userId = params.get('id') || '';
      this.loadConsensusResults();
      this.connectWebSocket();
    });
  }

  ngOnDestroy(): void {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
  }

  loadConsensusResults(): void {
    this.topicDataService.getConsensusResults(this.groupId).subscribe(
      (results) => {
        this.showResults = true;
        this.consensusResults = results.results;
        this.checkForTie();

      },
      (error) => {
        if (error.error === "Not all users have completed phase 1 and 2") {
          this.showResults = false;
        }
        console.error('Error loading consensus results:', error);
      }
    );
  }

  connectWebSocket(): void {
    if (this.groupId) {


      const socket = this.webSocketService.connect(this.groupId);
      this.wsSubscription = socket.subscribe(
        message => {


          if (message.message.type === 'connection_count') {
            this.activeConnections = message.message.active_connections;

          }

          if (message.message.type === 'consensus_calculation_completed') {
            this.consensusResults = message.message.results;
            this.showResults = true;
            this.checkForTie();
          }

          if (message.message.type === 'phase_update') {
            const phase = message.message.phase;
            if (phase === 1) {
              const phaseKey = `phase_${this.groupId}`;
              localStorage.setItem(phaseKey, '1');
              setTimeout(() => {
                this.router.navigate([`/profile/${this.userId}/my-groups/${this.groupId}/consensus/valuation`]);
              }, 1500);
            }
            if (phase === 0) {
              const phaseKey = `phase_${this.groupId}`;
              localStorage.setItem(phaseKey, '0');
              setTimeout(() => {
                this.router.navigate([`/profile/${this.userId}/my-groups/${this.groupId}/consensus/recommend-topics`]);
              }, 1500);
            }
          }

          if (message.message.type === 'remove_member') {
            this.loadConsensusResults();
          }
        },
        (error) => {
          console.error('Error receiving consensus results via WebSocket:', error);
        }
      );
    }
  }

  private checkForTie(): void {
    const valueCounts = new Map<number, number>();

    this.consensusResults.forEach(result => {
      const count = valueCounts.get(result.final_value) || 0;
      valueCounts.set(result.final_value, count + 1);
    });

    this.isDraw = Array.from(valueCounts.values()).some(count => count > 1);
  }
}
