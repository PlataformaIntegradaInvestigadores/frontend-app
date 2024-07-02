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
  showSliders:boolean = false;
  showLabel: boolean[] = [];
  showCheckTopics: boolean[] = [];
  newTopic: string = '';
  userAddedTopicsIndexes: number[] = [];
  combinedChecksState: boolean[] = [];
  enableCombinedSearch: boolean = false;
  showAddTopicForm: boolean = false;

  groupId: string = '';
  recommendedTopics: RecommendedTopic[] = [];
  addedTopics: TopicAddedUser[] = [];
  socketSubscription: Subscription | undefined;
  topicsSubscription: Subscription | undefined;
  newTopicSubscription: Subscription | undefined;
  activeConnections: number = 0;

  showError: boolean = false;
  errorMessage: string = '';

  notifications: any[] = [];


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
      console.log('Group ID:', this.groupId);
      this.loadTopics();
      this.connectWebSocket();
    });

    this.topicsSubscription = this.topicService.topics$.subscribe(
      topics => {
        this.addedTopics = topics;
        this.cdr.detectChanges();
      }
    );

    this.newTopicSubscription = this.webSocketService.newTopicReceived.subscribe(topic => {
      console.log('New topic received para ingresar:', topic);
      // Verificar si el tópico ya existe antes de agregarlo
      if (!this.recommendedTopics.some(t => t.topic_name === topic.topic_name)) {
        this.recommendedTopics.push(topic);
        this.cdr.detectChanges();
      } else {
        console.log('Tópico ya existe en la lista:', topic.topic_name);
      }
      if (!this.notifications.some(t => t.notification_message === topic.notification_message)) {
        this.notifications.push(topic);
        console.log("Se pusheo la notificacion al arreglo")
        console.log(this.notifications)
        this.cdr.detectChanges();
      } 
    });

    this.webSocketService.notificationsReceived.subscribe(notification => {
      console.log('Notification INTERACTIVIDAD DE USUARIO received:', notification);
      this.notifications.push(notification);
      this.cdr.detectChanges();
    });

    console.log('Current URL:', this.router.url);
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
            console.log('Recommended topics:', this.recommendedTopics);
          } else {
            this.getAndAssignRandomTopics();
          }
          console.log('Number of recommended topics:', this.recommendedTopics.length);
          this.initializeProperties();
        },
        error => {
          console.error('Error loading recommended topics:', error);
        }
      );

      this.topicService.getTopicsAddedByGroup(this.groupId).subscribe(
        response => {
          this.addedTopics = response;
          console.log('Added topics:', this.addedTopics);
          console.log('Number of added topics:', this.addedTopics.length);
        },
        error => {
          console.error('Error loading added topics:', error);
        }
      );
    }
  }

  initializeProperties(): void {
    this.rangeValues = new Array(this.recommendedTopics.length).fill(0);
    this.showLabel = new Array(this.recommendedTopics.length).fill(false);
    this.showCheckTopics = new Array(this.recommendedTopics.length).fill(false);
  }

  getAndAssignRandomTopics(): void {
    this.topicService.getRandomRecommendedTopics(this.groupId).subscribe(
      response => {
        this.recommendedTopics = response;
        console.log('Randomly assigned topics:', this.recommendedTopics);
      },
      error => {
        console.error('Error assigning random topics:', error);
      }
    );
  }

  connectWebSocket(): void {
    if (this.groupId) {
      console.log(`Connecting WebSocket for group: ${this.groupId}`);
      const socket = this.webSocketService.connect(this.groupId);
      this.socketSubscription = socket.subscribe(message => {
        
        console.log('Message received: entro al subscriptor', message);

        if (message.message.type === 'connection_count') {
          this.activeConnections = message.message.active_connections;
          this.cdr.detectChanges();  // Forzar detección de cambios
        }

        if (message.message.type === 'new_topic') {
          const newTopic = message.message.topic_name;       
          this.topicService.updateTopics(newTopic);
          this.cdr.detectChanges();
        }

      }, err => {
        console.error(`WebSocket error for group ${this.groupId}:`, err);
      }, () => {
        console.log(`WebSocket connection closed for group ${this.groupId}`);
      });
    }
  }

  disconnectWebSocket(): void {
    if (this.groupId) {
      console.log(`Disconnecting WebSocket for group: ${this.groupId}`);
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
          /* Mensaje enviado desde el front al backend */
          console.log('New topic added enviado por el front:', response);
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
          console.log('New topic message sent to WebSocket:', response);
        },
        error => {
          console.error('Error adding new topic:', error);
          if (error.status === 400 && error.error.error === "Topic already exists in this group") {
            this.errorMessage = "This topic already exists in the group.";
          } else {
            //this.errorMessage = "An unexpected error occurred. Please try again.";
            this.errorMessage = "This topic already exists in the group.";
          }
          this.showError = true;  // Mostrar el mensaje de error
         
          // Desplazar hacia el mensaje de error
          setTimeout(() => {
            const errorElement = document.getElementById('error-message');
            if (errorElement) {
              errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            // Configurar temporizador para ocultar el mensaje de error después de 5 segundos
            setTimeout(() => {
              this.showError = false;
              this.cdr.detectChanges();  // Forzar detección de cambios
            }, 8000);
        }, 0);
      }
    );
    }
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


  getGradient(value: number): string {
    /* #172554  == hsl(223, 58%, 20%) */
    /* #1E3C8B == hsl(227, 65%, 34%) */
    const hue = 227;  // Tono fijo del color final
    const saturation = 65; // Saturación fija del color final
    // A medida que el valor aumenta, la luminosidad disminuye hacia 20% (oscuro)
    let lightness = 80 - (80 - 34) * (value / 100); // Invertir la interpolación
    return `linear-gradient(90deg, hsl(${hue}, ${saturation}%, ${lightness}%) 0%, hsl(${hue}, ${saturation}%, ${lightness}%) 100%)`;
  }

  redirectToGoogleScholar(topic: string): void {
    const query = encodeURIComponent(topic);
    const url = `https://scholar.google.com/scholar?q=${query}`;
    window.open(url, '_blank');
  }

  combinedSearch(): void {
    const selectedTopics = this.recommendedTopics.map(topic => topic.topic_name).filter((_, index) => this.combinedChecksState[index]);
    if (selectedTopics.length > 0) {
      const query = encodeURIComponent(selectedTopics.join(' '));
      const url = `https://scholar.google.com/scholar?q=${query}`;
      window.open(url, '_blank');
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

  removeLastUserAddedTopic(): void {
    if (this.userAddedTopicsIndexes.length > 0) {
      const lastIndex = this.userAddedTopicsIndexes.pop(); // Obtener y eliminar el último índice
      if (lastIndex !== undefined) {
        this.addedTopics.splice(lastIndex, 1);
        this.rangeValues.splice(lastIndex, 1);
        this.showLabel.splice(lastIndex, 1);
        this.showCheckTopics.splice(lastIndex, 1);
        // Actualizar los índices de los tópicos agregados por el usuario
        this.userAddedTopicsIndexes = this.userAddedTopicsIndexes.map(index => index > lastIndex ? index - 1 : index);
      }
    } else {
      alert('No user-added topics to remove.');
    }
  }

  toggleExpertise(): void {
    this.showSliders = !this.showSliders;
  }

  toggleAddTopicForm(): void { 
    this.showAddTopicForm = !this.showAddTopicForm;
  }

}
