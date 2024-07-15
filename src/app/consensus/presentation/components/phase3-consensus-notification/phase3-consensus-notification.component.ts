import { ChangeDetectorRef, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TopicService } from 'src/app/consensus/domain/services/TopicDataService.service';
import { WebSocketPhase3Service } from 'src/app/consensus/domain/services/websocket-phase3.service';

@Component({
  selector: 'phase3-consensus-notification',
  templateUrl: './phase3-consensus-notification.component.html',
  styleUrls: ['./phase3-consensus-notification.component.css']
})
export class Phase3ConsensusNotificationComponent {

  satisfactionNotifications: any[] = [];
  groupId: string = '';
  private wsSubscription: Subscription | undefined;
  
  
  constructor(
    private webSocketService: WebSocketPhase3Service,
    private topicService: TopicService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.groupId = params.get('groupId') || '';
      this.loadNotifications();
      this.connectWebSocket();
    });
  }

  ngOnDestroy(): void {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
  }

  loadNotifications(): void {
    this.topicService.getUserSatisfactionNotifications(this.groupId).subscribe(
      notifications => {
        console.log('Notification 3333333333:', notifications);
        notifications.forEach((notification: any) => {
          console.log('Notification 444444444444:', notification);
          // Convertir `created_at` a objeto Date
          notification.created_at = new Date(notification.created_at);
          this.satisfactionNotifications.push(notification);
          console.log('ARREGLO SATISAFACCION 3333333333:', this.satisfactionNotifications);
        });
        console.log('ARREGLO SATISAFACCION 33333444444:', this.satisfactionNotifications);
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error loading notifications:', error);
      }
    );
    console.log('Notificationssssss 3333333333:', this.satisfactionNotifications);
  }
  


  connectWebSocket(): void {
    if (this.groupId) {
      console.log('Connecting to WebSocket for group PHASE 3:', this.groupId);
      const socket = this.webSocketService.connect(this.groupId);
      this.wsSubscription = this.webSocketService.userSatisfactionReceived.subscribe(
        msg => {
  
          // Convertir `added_at` a objeto Date si existe
          if (msg.added_at) {
            msg.added_at = new Date(msg.added_at);
          }
          // Convertir `created_at` a objeto Date si no es null, de lo contrario usar `added_at`
          msg.created_at = msg.created_at ? new Date(msg.created_at) : msg.added_at;

          this.satisfactionNotifications.push(msg);
          this.cdr.detectChanges();
        },
        error => {
          console.error('Error receiving WebSocket notification:', error);
        }
      );
    }
  }
  

  formatDate(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const oneDay = 24 * 60 * 60 * 1000;

    if (diff < oneDay) {
      return date.toLocaleTimeString(); // HH:MM AM/PM format
    } else {
      return date.toLocaleDateString(); // MM/DD/YYYY format
    }
  }
}