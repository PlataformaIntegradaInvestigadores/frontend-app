import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private topicDataService: TopicService,
    private route: ActivatedRoute,
    private webSocketService: WebSocketPhase3Service
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.groupId = params.get('groupId') || '';
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
        this.consensusResults = results.results;

      },
      (error) => {
        console.error('Error loading consensus results:', error);
      }
    );
  }

  connectWebSocket(): void {
    if(this.groupId){


      const socket = this.webSocketService.connect(this.groupId);
      this.wsSubscription = socket.subscribe(
        message => {
       

          if (message.message.type === 'connection_count') {
            this.activeConnections = message.message.active_connections;
         
          }

          if (message.message.type === 'consensus_calculation_completed') {
            this.consensusResults = message.message.results;
   }
        },
        (error) => {
          console.error('Error receiving consensus results via WebSocket:', error);
        }
      );
    }
  }
}
