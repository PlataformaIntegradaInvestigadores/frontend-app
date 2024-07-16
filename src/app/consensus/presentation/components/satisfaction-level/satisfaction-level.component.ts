import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/domain/services/auth.service';
import { TopicService } from 'src/app/consensus/domain/services/TopicDataService.service';
import { WebSocketPhase3Service } from 'src/app/consensus/domain/services/websocket-phase3.service';
@Component({
  selector: 'satisfaction-level',
  templateUrl: './satisfaction-level.component.html',
  styleUrls: ['./satisfaction-level.component.css']
})
export class SatisfactionLevelComponent implements OnInit, OnDestroy {

  isDecisionPhase: boolean = false;
  private wsSubscription: Subscription | undefined;
  showAlreadyVotedNotification = false;
  groupId = this.activatedRoute.snapshot.paramMap.get('groupId') || '';

  satisfactionCounts: any = {
    Unsatisfied: 0,
    'Slightly Unsatisfied': 0,
    Neutral: 0,
    'Slightly Satisfied': 0,
    Satisfied: 0
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private topicService: TopicService,
    private webSocketService: WebSocketPhase3Service,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    initFlowbite();
    this.connectWebSocket();
    this.loadSatisfactionCounts();
  }

  ngOnDestroy(): void {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
    this.webSocketService.close(this.groupId);
  }


  connectWebSocket(): void {
    if (this.groupId) {
      const socket = this.webSocketService.connect(this.groupId);
      this.wsSubscription = this.webSocketService.userSatisfactionReceived.subscribe(
        (message) => {
          this.updateSatisfactionCounts(message.counts);
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error receiving WebSocket message:', error);
        }
      );
    }
  }

  loadSatisfactionCounts(): void {
    const groupId = this.activatedRoute.snapshot.paramMap.get('groupId') || '';
    this.topicService.getSatisfactionCounts(groupId).subscribe(
      counts => {
        this.satisfactionCounts = counts.counts;
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error loading satisfaction counts:', error);
      }
    );
  }

  updateSatisfactionCounts(counts: any): void {
    this.satisfactionCounts = counts;
  }

  submitSatisfaction(level: string): void {
    const groupId = this.activatedRoute.snapshot.paramMap.get('groupId') || '';
    const userId = this.authService.getUserId();
    if (groupId && userId) {
      this.topicService.saveUserSatisfaction(groupId, userId, level).subscribe(
        response => {
          console.log('User satisfaction saved:', response);
        },
        error => {
          if (error.status === 500) {
            this.showAlreadyVotedNotification = true;
            setTimeout(() => {
              this.showAlreadyVotedNotification = false;
              this.cdr.detectChanges();
            }, 4000);
          }
        }
      );
    }
  }
}
