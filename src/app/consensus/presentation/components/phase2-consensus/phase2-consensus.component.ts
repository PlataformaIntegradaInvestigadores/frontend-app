import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule, NgFor } from '@angular/common';
import { RecommendedTopic } from 'src/app/consensus/domain/entities/topic.interface';
import { TopicService } from 'src/app/consensus/domain/services/TopicDataService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebSocketPhase2Service } from 'src/app/consensus/domain/services/websocket-phase2.service';
import { AuthService } from 'src/app/auth/domain/services/auth.service';
import { WebSocketService } from 'src/app/consensus/domain/services/WebSocketService.service';

@Component({
  selector: 'phase2-consensus',
  templateUrl: './phase2-consensus.component.html',
  styleUrls: ['./phase2-consensus.component.css'],
  standalone: true,
  imports: [CdkDropList, NgFor, CdkDrag, CdkDragPlaceholder, CommonModule],
})

export class Phase2ConsensusComponent implements OnInit, OnDestroy {
  
  recommendedTopics: RecommendedTopic[] = [];
  groupId: string = '';
  activeConnections: number = 0;
  private socketSubscription: Subscription | undefined;
  private newTopicSubscription: Subscription | undefined;
  private notificationsSubscription: Subscription | undefined;
  finalOrderedTopics: { id: number, topic_name: string, tags: string[] }[] = [];

  showModalPhaseTwo: boolean = false;

  constructor(
    private topicService: TopicService,
    private webSocketService: WebSocketPhase2Service,
    private route: ActivatedRoute,
    private authService: AuthService,
    private webSocket1Service: WebSocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.groupId = params.get('groupId') || '';
      console.log('Group ID:', this.groupId);
      this.loadRecommendedTopics();
      this.connectWebSocket();
    });
  }

  ngOnDestroy(): void {
    this.disconnectWebSocket();
  }

  loadRecommendedTopics(): void {
    const groupId = this.groupId;
    this.topicService.getRecommendedTopicsByGroup(groupId).subscribe(
      (topics) => {
        this.recommendedTopics = topics.map(topic => ({ ...topic, tags: [] }));
        this.updateFinalOrderedTopics();
        console.log('Recommended topics:', this.recommendedTopics);
      },
      (error) => {
        console.error('Error loading recommended topics:', error);
      }
    );
  }

  drop(event: CdkDragDrop<RecommendedTopic[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      const previousTopic = this.recommendedTopics[event.previousIndex];
      const newTopic = this.recommendedTopics[event.currentIndex];

      console.log(`Topic moved: "${previousTopic.topic_name}" from position ${event.previousIndex + 1} to ${event.currentIndex + 1}`);
      
      // Notificar el movimiento del tópico
      this.sendTopicMovedNotification(previousTopic, event.previousIndex, event.currentIndex);
    }
    
    moveItemInArray(this.recommendedTopics, event.previousIndex, event.currentIndex);
    this.updateFinalOrderedTopics();
  }

  updateFinalOrderedTopics(): void {
    this.finalOrderedTopics = this.recommendedTopics.map(topic => ({ id: topic.id, topic_name: topic.topic_name, tags: topic.tags ?? [] }));
    console.log('Final ordered topics:', this.finalOrderedTopics);
  }

  toggleTag(topic: RecommendedTopic, tag: string): void {
    const userId = this.authService.getUserId();
    const positiveTags = ['Novel', 'Attractive', 'Trend'];
    const negativeTags = ['Obsolete', 'Unfamiliar'];

    if (!topic.tags) {
      topic.tags = [];
    }

    if (positiveTags.includes(tag)) {
      topic.tags = topic.tags.filter(t => !negativeTags.includes(t));
    } else if (negativeTags.includes(tag)) {
      topic.tags = topic.tags.filter(t => !positiveTags.includes(t));
    }

    if (topic.tags.includes(tag)) {
      topic.tags = topic.tags.filter(t => t !== tag);
    } else {
      topic.tags.push(tag);
    }

    console.log(`Toggled tag "${tag}" for topic "${topic.topic_name}". Current tags: ${topic.tags}`);

    if (tag === 'Novel') {
      this.recommendedTopics = this.recommendedTopics.filter(t => t.id !== topic.id);
      this.recommendedTopics.unshift(topic);
    } else if (tag === 'Obsolete') {
      this.recommendedTopics = this.recommendedTopics.filter(t => t.id !== topic.id);
      this.recommendedTopics.push(topic);
    }

    this.updateFinalOrderedTopics();

    if (this.groupId && userId) {
      this.topicService.notifyTopicTagChange(this.groupId, userId, topic.id, tag).subscribe(
        response => {
          console.log('Tag change notification sent:', response);
        },
        error => {
          console.error('Error sending tag change notification:', error);
        }
      );
    }
  }

  sendTopicMovedNotification(topic: RecommendedTopic, previousIndex: number, currentIndex: number): void {
    if (this.groupId) {
      const userId = this.authService.getUserId();
      this.topicService.notifyTopicReorder(this.groupId, userId || "", topic.id.toString(), previousIndex + 1, currentIndex + 1).subscribe(
        response => {
          console.log('Topic reorder notification sent:', response);
        },
        error => {
          console.error('Error sending topic reorder notification:', error);
        }
      );
    }
  }

  completeConsensusPhaseTwo(): void {
    this.showModalPhaseTwo = true;
  }

  closeModalPhaseTwo(): void {
    this.showModalPhaseTwo = false;
  }

  confirmPhaseTwoCompletion(): void {
    const userId = this.authService.getUserId();
    if (this.groupId && userId) {
      const totalTopics = this.finalOrderedTopics.length;
      const finalTopicOrders = this.finalOrderedTopics.map((topic, index) => ({
        idTopic: topic.id,
        posFinal: totalTopics - index, // Invertir el valor de posFinal
        label: topic.tags.join(', ')
      }));
  
      console.log('Final topic orders:', JSON.stringify(finalTopicOrders, null, 2));
  
      this.topicService.saveFinalTopicOrder(this.groupId, userId, finalTopicOrders).subscribe(
        response => {
          console.log('Final topic order saved:', response);
          const phaseKey = `phase_${this.groupId}`;
          localStorage.setItem(phaseKey, '2'); // Actualizar la fase en el localStorage
          const currentUrl = this.router.url;
          const newUrl = currentUrl.replace('valuation', 'decision');
          this.router.navigateByUrl(newUrl);
          console.log('Redirecting to:', newUrl);
          this.closeModalPhaseTwo();
        },
        error => {
          console.error('Error saving final topic order:', error);
        }
      );
    }
  }

  cancelPhaseTwoCompletion(): void {
    this.closeModalPhaseTwo();
  }

  connectWebSocket(): void {
    if (this.groupId) {
      console.log(`Connecting WebSocket for group PHASE 2: ${this.groupId}`);
      
      // Cerrar WebSocket de fase 1 antes de conectar a fase 2
      this.webSocket1Service.close(this.groupId);

      const socket = this.webSocketService.connect(this.groupId);

      this.socketSubscription = socket.subscribe(
        message => {
          console.log('Message received:', message);

          if (message.message.type === 'connection_count') {
            this.activeConnections = message.message.active_connections;
            console.log('Active connections PHASE 2222222:', this.activeConnections);
          }
        },
        err => console.error(`WebSocket error for group ${this.groupId}:`, err),
        () => console.log(`WebSocket connection closed for group ${this.groupId}`)
      );

      this.newTopicSubscription = this.webSocketService.topicReceived.subscribe(
        msg => {
          console.log('Nuevo tópico recibido en fase 2:', msg);
          //this.recommendedTopics.push(msg);
          this.updateFinalOrderedTopics();
        }
      );

      this.notificationsSubscription = this.webSocketService.notificationReceived.subscribe(
        msg => {
          console.log('Nueva notificación recibida en fase 2:', msg);
          // Manejar las notificaciones recibidas aquí
        }
      );
    }
  }

  disconnectWebSocket(): void {
    if (this.groupId) {
      console.log(`Disconnecting WebSocket for group: ${this.groupId}`);
      this.webSocketService.close(this.groupId);
      if (this.socketSubscription) {
        this.socketSubscription.unsubscribe();
      }
      if (this.newTopicSubscription) {
        this.newTopicSubscription.unsubscribe();
      }
      if (this.notificationsSubscription) {
        this.notificationsSubscription.unsubscribe();
      }
    }
  }
}
