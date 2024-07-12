import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationAdd, NotificationGeneral } from 'src/app/consensus/domain/entities/notificationAdd.interface';
import { GetNotificationAddTopicService } from 'src/app/consensus/domain/services/GetNotificationAddTopicService.service';
import { WebSocketPhase2Service } from 'src/app/consensus/domain/services/websocket-phase2.service';

@Component({
  selector: 'phase2-consensus-notification',
  templateUrl: './phase2-consensus-notification.component.html',
  styleUrls: ['./phase2-consensus-notification.component.css']
})
export class Phase2ConsensusNotificationComponent implements OnInit{

  newNotificationSubscription: Subscription | undefined;
  notificationsWS: NotificationAdd[] = [];
  notificationsLoaded: NotificationGeneral[] = [];
  unifiedNotifications: any[] = [];
  
  groupId: string = '';
  
  constructor(
    private webSocketService: WebSocketPhase2Service,
    private notificationService: GetNotificationAddTopicService,
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

    /* Lo que trae el webscoket */
    this.newNotificationSubscription = this.webSocketService.topicReceived.subscribe((topic: any) => {
      const notification: NotificationAdd = {
        ...topic,
        added_at: new Date(topic.added_at)
      };
      if (!this.notificationsWS.some(t => t.notification_message === notification.notification_message)) {
        this.notificationsWS.unshift(notification);
        this.updateUnifiedNotifications();
        this.cdr.detectChanges();
      }
    });

    this.newNotificationSubscription = this.webSocketService.notificationReceived.subscribe((notification: any) => {
      console.log("WEBSOCKET 222222222222222 ", this.webSocketService.notificationReceived);
      console.log("Reconocio la notificacion", notification);

      if (  notification.type === 'topic_reorder') {
              
        console.log("Reconocio el TOPIC_REOREDERRRRR:", notification.notification_message);
        
        const existingNotificationIndex = this.notificationsLoaded.findIndex(n => n.id === notification.id);
        if (existingNotificationIndex !== -1) {
          // Remove the existing notification
          this.notificationsLoaded.splice(existingNotificationIndex, 1);
        }
        
        const visitedNotification: NotificationGeneral = {
          id: notification.id,
          user_id: notification.user_id,
          group_id: notification.group_id,
          notification_type: notification.type,
          message: notification.notification_message,
          created_at: new Date(notification.added_at)
        };
        this.notificationsLoaded.unshift(visitedNotification);
        this.updateUnifiedNotifications();
        this.cdr.detectChanges();
        console.log("NOTIFICACIONES VISITADAS", this.notificationsWS);
      }

    });

  }

  ngOnDestroy(): void {
    if (this.newNotificationSubscription) {
      this.newNotificationSubscription.unsubscribe();
    }
  }

  loadNotifications(): void {
    this.notificationService.getNotificationsPhaseTwo(this.groupId).subscribe(
      notifications => {
        this.notificationsLoaded = notifications.map(notification => ({
          ...notification,
          created_at: new Date(notification.created_at)
        }));
        
        console.log("NOTIFICACIONES CARGADAS", this.notificationsLoaded);
        this.updateUnifiedNotifications();
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error loading notifications:', error);
      }
    );
  }

  connectWebSocket(): void {
    if (this.groupId) {
      this.newNotificationSubscription = this.webSocketService.notificationReceived.subscribe((notification: any) => {
        console.log("Nueva notificación recibida en websocket 2:", notification);

        const existingNotificationIndex = this.notificationsLoaded.findIndex(n => n.id === notification.id);
        if (existingNotificationIndex !== -1) {
          // Remove the existing notification
          this.notificationsLoaded.splice(existingNotificationIndex, 1);
        }
        
        const newNotification: NotificationGeneral = {
          id: notification.id,
          user_id: notification.user_id,
          group_id: notification.group_id,
          notification_type: notification.type,
          message: notification.notification_message,
          created_at: new Date(notification.added_at)
        };
        this.notificationsLoaded.unshift(newNotification);
        this.updateUnifiedNotifications();
        this.cdr.detectChanges();
      });
    }
  }

  updateUnifiedNotifications(): void {
    this.unifiedNotifications = [
      ...this.notificationsLoaded.map(notification => ({
        ...notification,
        type: 'rest',
        date: notification.created_at,
        message: notification.message
      })),
      ...this.notificationsWS.map(notification => ({
        ...notification,
        type: 'ws',
        date: notification.added_at,
        message: notification.notification_message
      }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime());
    console.log("ARREGLO CON LA DATA UNIFICADA22222222", this.unifiedNotifications);
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


