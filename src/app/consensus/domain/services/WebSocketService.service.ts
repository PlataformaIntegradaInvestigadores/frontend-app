// websocket.service.ts

import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {

  private sockets: { [key: string]: WebSocketSubject<any> } = {};
  public newTopicReceived: Subject<any> = new Subject<any>();
  public notificationsReceived: Subject<any> = new Subject<any>();

  connect(groupId: string): WebSocketSubject<any> {
    if (!this.sockets[groupId] || this.sockets[groupId].closed) {
      console.log(`Creating new WebSocket connection for group: ${groupId}`);
      this.sockets[groupId] = webSocket(`${environment.wsUrl}/groups/${groupId}/`);
      this.sockets[groupId].subscribe(
        msg => {
          // Imprimir la estructura completa del mensaje recibido
          console.log(`Message received on group ws service estructura completa del mensaje recibido ${groupId}:`, JSON.stringify(msg, null, 2));

          // Verificar si msg.message existe antes de acceder a sus propiedades
          if (msg && msg.message) {
            const { type, topic_name, notification_message, active_connections } = msg.message;

            switch (type) {
              
              case 'new_topic':
                console.log('Nuevo tópico recibido:', topic_name);
                console.log('Nueva notificación recibida:', notification_message);
                this.newTopicReceived.next(msg.message);
                break;

              case 'connection_count':
                console.log('Número de conexiones activas:', active_connections);
                break;

              case 'topic_visited':
                console.log('Nueva notificación recibida1:', msg);
                console.log('Nueva notificación recibida2:', msg.message);
                console.log('Nueva notificación recibida3:', notification_message);
                this.notificationsReceived.next(msg.message);
                break;

              case 'combined_search':
                console.log('Nueva notificación recibida10:', msg);
                console.log('Nueva notificación recibida20:', msg.message);
                console.log('Nueva notificación recibida30:', notification_message);
                this.notificationsReceived.next(msg.message);
                break;

              case 'user_expertise':
                console.log('Nueva notificación recibida10:', msg);
                console.log('Nueva notificación recibida20:', msg.message);
                console.log('Nueva notificación recibida30:', notification_message);
                this.notificationsReceived.next(msg.message);
                break;

              default:
                console.warn('Tipo de mensaje desconocido:', type);
            }
          } else {
            console.warn('Received message without expected structure:', msg);
          }
        },
        err => console.error(`WebSocket error on group ${groupId}:`, err),
        () => console.log(`WebSocket connection closed for group ${groupId}`)
      );
    } else {
      console.log(`Reusing existing WebSocket connection for group: ${groupId}`);
    }
    return this.sockets[groupId];
  }

  sendMessage(groupId: string, message: any) {
    if (this.sockets[groupId]) {
      console.log(`Sending message to group ${groupId}:`, message);
      this.sockets[groupId].next(message);
    } else {
      console.warn(`No WebSocket connection found for group ${groupId} to send message.`);
    }
  }

  close(groupId: string) {
    if (this.sockets[groupId]) {
      console.log(`Closing WebSocket connection for group: ${groupId}`);
      this.sockets[groupId].complete();
      delete this.sockets[groupId];
    } else {
      console.warn(`No WebSocket connection found for group ${groupId} to close.`);
    }
  }

  closeAll() {
    console.log('Closing all WebSocket connections');
    for (const groupId in this.sockets) {
      this.sockets[groupId].complete();
    }
    this.sockets = {};
  }
}
