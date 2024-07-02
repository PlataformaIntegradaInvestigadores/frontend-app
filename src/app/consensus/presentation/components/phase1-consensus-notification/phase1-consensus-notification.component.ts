import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationAdd, NotificationGroup } from 'src/app/consensus/domain/entities/notificationAdd.interface';
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
  notificationsLoaded: NotificationGroup[] = [];
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