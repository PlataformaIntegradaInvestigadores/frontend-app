import { Component, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/domain/services/auth.service';
import { RecommendedTopic, TopicAddedUser } from 'src/app/consensus/domain/entities/topic.interface';
import { TopicService } from 'src/app/consensus/domain/services/TopicDataService.service';
import { WebSocketService } from 'src/app/consensus/domain/services/WebSocketService.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'phase1-consensus',
  templateUrl: './phase1-consensus.component.html',
  styleUrls: ['./phase1-consensus.component.css']
})
export class Phase1ConsensusComponent implements OnInit, OnDestroy {

  rangeValues: number[] = [];
  showSliders: boolean = false;
  showLabel: boolean[] = [];
  showCheckTopics: boolean[] = [];
  newTopic: string = '';
  userAddedTopicsIndexes: number[] = [];
  combinedChecksState: boolean[] = [];
  enableCombinedSearch: boolean = false;
  showAddTopicForm: boolean = false;
  showModal: boolean = false;

  groupId: string = '';
  recommendedTopics: RecommendedTopic[] = [];
  addedTopics: TopicAddedUser[] = [];
  socketSubscription: Subscription | undefined;
  topicsSubscription: Subscription | undefined;
  newTopicSubscription: Subscription | undefined;
  newNotificationSubscription: Subscription | undefined;
  activeConnections: number = 0;

  showError: boolean = false;
  errorMessage: string = '';

  notifications: any[] = [];

  userPhase: number = -1; 

  constructor(
    private topicService: TopicService,
    private webSocketService: WebSocketService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.groupId = params.get('groupId') || '';
      this.checkUserPhase(); // Llama a esta función para verificar la fase del usuario
    });

    this.topicsSubscription = this.topicService.topics$.subscribe(
      topics => {
        this.addedTopics = topics;
        this.cdr.detectChanges();
      }
    );

    this.newTopicSubscription = this.webSocketService.newTopicReceived.subscribe(topic => {
  
      if (!this.recommendedTopics.some(t => t.topic_name === topic.topic_name)) {
        this.recommendedTopics.push(topic);
        this.rangeValues = [...this.rangeValues, 0]; // Fix: Assign the value directly to the array
        this.cdr.detectChanges();
      } else {

      }
      if (!this.notifications.some(t => t.notification_message === topic.notification_message)) {
        this.notifications.push(topic);
        this.cdr.detectChanges();
      }
    });

    this.newNotificationSubscription = this.webSocketService.notificationsReceived.subscribe(notification => {

      this.notifications.push(notification);
      this.cdr.detectChanges();
    });


  }

  checkUserPhase(): void {
    this.topicService.getUserCurrentPhase(this.groupId).subscribe(
      response => {
        this.userPhase = response.phase;
        if (this.userPhase === 0) {
          this.loadTopics();
          this.connectWebSocket();
        }
      },
      error => {
        console.error('Error fetching user phase:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.disconnectWebSocket();
    if (this.topicsSubscription) {
      this.topicsSubscription.unsubscribe();
    }
    if (this.newTopicSubscription) {
      this.newTopicSubscription.unsubscribe();
    }
  }

  loadTopics(): void {
    if (this.groupId) {
      this.topicService.getRecommendedTopicsByGroup(this.groupId).subscribe(
        response => {
          if (response.length > 0) {
            this.recommendedTopics = response;
            //console.log('Recommended topics:', this.recommendedTopics);
          } else {
            this.getAndAssignRandomTopics();
          }
          this.initializeProperties();
        },
        error => {
          console.error('Error loading recommended topics:', error);
        }
      );

      this.topicService.getTopicsAddedByGroup(this.groupId).subscribe(
        response => {
          this.addedTopics = response;
        },
        error => {
          console.error('Error loading added topics:', error);
        }
      );
    }
  }

  getAndAssignRandomTopics(): void {
    this.topicService.getRandomRecommendedTopics(this.groupId).subscribe(
      response => {
        this.recommendedTopics = response;
  
        this.initializeProperties();
      },
      error => {
        console.error('Error assigning random topics:', error);
      }
    );
  }

  connectWebSocket(): void {
    if (this.groupId) {

      const socket = this.webSocketService.connect(this.groupId);
      this.socketSubscription = socket.subscribe(message => {

        if (message.message.type === 'connection_count') {
          this.activeConnections = message.message.active_connections;
          this.cdr.detectChanges();
        }

        if (message.message.type === 'new_topic') {
          const newTopic = message.message.topic_name;
          this.topicService.updateTopics(newTopic);
          this.cdr.detectChanges();
        }

      }, err => {
        console.error(`WebSocket error for group ${this.groupId}:`, err);
      },);
    }
  }

  disconnectWebSocket(): void {
    if (this.groupId) {
      this.webSocketService.close(this.groupId);
      if (this.socketSubscription) {
        this.socketSubscription.unsubscribe();
      }
      this.webSocketService.closeAll();
    }
  }

  addTopic(): void {
    const userId = this.authService.getUserId();
    if (this.newTopic.trim() && userId && this.groupId) {
      this.topicService.addNewTopic(this.groupId, this.newTopic.trim()).subscribe(
        response => {
          this.newTopic = '';
          this.webSocketService.sendMessage(this.groupId, {
            type: 'new_topic',
            topic: {
              id: response.id,
              topic: response.topic.topic_name,
              user_id: userId,
              group_id: this.groupId,
              added_at: response.added_at
            }
          });
        },
        error => {
          console.error('Error adding new topic:', error);

          if (error.status === 403) {
            this.errorMessage = error.error.error;
          } else if (error.status === 400) {
            this.errorMessage = "This topic already exists in the group.";
          } else {
            this.errorMessage = "An error occurred.";
          }

          this.showError = true;

          setTimeout(() => {
            const errorElement = document.getElementById('error-message');
            if (errorElement) {
              errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            setTimeout(() => {
              this.showError = false;
              this.cdr.detectChanges();
            }, 8000);
          }, 0);
        }
      );
    }
  }

  sendUserExpertise(index: number): void {
    const userId = this.authService.getUserId();
    if (userId && this.groupId) {
      const topicId = this.recommendedTopics[index].id;
      const expertiseLevel = this.rangeValues[index];
      this.topicService.notifyExpertice(this.groupId, topicId, userId, expertiseLevel).subscribe();
    }
  }

  initializeProperties(): void {
    this.rangeValues = new Array(this.recommendedTopics.length).fill(0);
    this.showLabel = new Array(this.recommendedTopics.length).fill(false);
    this.showCheckTopics = new Array(this.recommendedTopics.length).fill(false);
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

  onSliderChange(index: number, event: any): void {
    this.rangeValues[index] = event.target.value;
  }

  getGradient(value: number): string {
    const hue = 227;
    const saturation = 65;
    let lightness = 80 - (80 - 34) * (value / 100);
    return `linear-gradient(90deg, hsl(${hue}, ${saturation}%, ${lightness}%) 0%, hsl(${hue}, ${saturation}%, ${lightness}%) 100%)`;
  }

  redirectToGoogleScholar(topic: RecommendedTopic): void {
    const query = encodeURIComponent(topic.topic_name);
    const url = `https://scholar.google.com/scholar?q=${query}`;
    window.open(url, '_blank');

    const userId = this.authService.getUserId();
    if (this.groupId && topic.id && userId) {
      this.topicService.notifyTopicVisited(this.groupId, topic.id.toString(), userId).subscribe(
        response => {
          //console.log('Topic visited notification sent:', response);
        },
        error => {
          console.error('Error sending topic visited notification:', error);
        }
      );
    }
  }

  combinedSearch(): void {
    const selectedTopics = this.recommendedTopics
      .filter((_, index) => this.combinedChecksState[index])
      .map(topic => topic);

    if (selectedTopics.length > 0) {
      const query = encodeURIComponent(selectedTopics.map(t => t.topic_name).join(' '));
      const url = `https://scholar.google.com/scholar?q=${query}`;
      window.open(url, '_blank');

      const userId = this.authService.getUserId();
      if (this.groupId && selectedTopics.length > 0 && userId) {
        const topicIds = selectedTopics.map(topic => topic.id.toString());
        this.topicService.notifyCombinedSearch(this.groupId, topicIds, userId).subscribe(
          response => {
            //console.log('Combined search notification sent:', response);
          },
          error => {
            console.error('Error sending combined search notification:', error);
          }
        );
      }
    } else {
      alert('Please select at least one topic for a combined search.');
    }
  }

  checkAndCombinedSearch(): void {
    if (this.enableCombinedSearch) {
      this.combinedSearch();
    } else {
      alert('Enable combined search by checking the box.');
      this.enableCombinedSearch = !this.enableCombinedSearch;
    }
  }

  toggleExpertise(): void {
    this.showSliders = !this.showSliders;
  }

  toggleAddTopicForm(): void {
    this.showAddTopicForm = !this.showAddTopicForm;
  }

  completeConsensusPhaseOne(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  confirmPhaseCompletion(): void {
    const userId = this.authService.getUserId();
    if (this.groupId && userId) {
      this.topicService.notifyPhaseOneCompleted(this.groupId, userId).subscribe(
        response => {
          const phaseKey = `phase_${this.groupId}`;
          localStorage.setItem(phaseKey, '1');
          const currentUrl = this.router.url;
          const newUrl = currentUrl.replace('recommend-topics', 'valuation');
          this.router.navigateByUrl(newUrl);
          this.closeModal();
        },
        error => {
          console.error('Error sending consensus completed notification:', error);
        }
      );
    }
  }

  cancelPhaseCompletion(): void {
    this.closeModal();
  }

}
