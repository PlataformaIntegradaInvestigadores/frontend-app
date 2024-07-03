import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationAdd, NotificationGeneral } from 'src/app/consensus/domain/entities/notificationAdd.interface';
import { GetNotificationAddTopicService } from 'src/app/consensus/domain/services/GetNotificationAddTopicService.service';
import { WebSocketService } from 'src/app/consensus/domain/services/WebSocketService.service';

@Component({
  selector: 'phase1-consensus-notification',
  templateUrl: './phase1-consensus-notification.component.html',
  styleUrls: ['./phase1-consensus-notification.component.css']
})
export class Phase1ConsensusNotificationComponent implements OnInit{
  
  newNotificationSubscription: Subscription | undefined;
  notificationsWS: NotificationAdd[] = [];
  notificationsLoaded: NotificationGeneral[] = [];
  unifiedNotifications: any[] = [];
  
  groupId: string = '';
  
  constructor(
    private webSocketService: WebSocketService,
    private notificationService: GetNotificationAddTopicService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
      this.route.parent?.paramMap.subscribe(params => {
        this.groupId = params.get('groupId') || '';
        this.loadNotifications();
      });
  
      /* Lo que trae el webscoket */
      this.newNotificationSubscription = this.webSocketService.newTopicReceived.subscribe((topic: any) => {
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
      
      this.newNotificationSubscription = this.webSocketService.notificationsReceived.subscribe((notification: any) => {
        console.log("WEBSOCKET 222222222222222 ", this.webSocketService.notificationsReceived);
        console.log("Reconocio la notificacion", notification);

        if (notification.type === 'topic_visited') {
          console.log("Reconocio el topic:visited", notification.notification_message);
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
      this.notificationService.getNotificationsAddTopicByGroup(this.groupId).subscribe(
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
      console.log("ARREGLO CON LA DATA UNIDADAAAAADADAAA", this.unifiedNotifications);
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