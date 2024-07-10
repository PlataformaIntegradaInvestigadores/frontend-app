import { Component, OnInit, OnDestroy } from '@angular/core';
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
  cdr: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private topicService: TopicService,
    private webSocketService: WebSocketPhase3Service,
    private authService: AuthService
  ) {}

  ngOnInit() {
    initFlowbite();
    this.router.events.subscribe(() => {
      this.updateComponentVisibility();
    });

    this.updateComponentVisibility();
    this.connectWebSocket();
  }

  ngOnDestroy(): void {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
  }

  updateComponentVisibility() {
    const url = this.router.url;
    this.isDecisionPhase = url.includes('/profile/my-groups/1/consensus/decision');
  }

  connectWebSocket(): void {
    const groupId = this.activatedRoute.snapshot.paramMap.get('groupId') || '';
    if (groupId) {
      const socket = this.webSocketService.connect(groupId);
      this.wsSubscription = this.webSocketService.userSatisfactionReceived.subscribe(
        (message) => {
          console.log('WebSocket message received:', message);
          // Aquí puedes actualizar cualquier lógica de la UI si es necesario
        },
        (error) => {
          console.error('Error receiving WebSocket message:', error);
        }
      );
    }
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
