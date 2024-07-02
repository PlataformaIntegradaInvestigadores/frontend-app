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
                if (msg.message) {
                    if (msg.message.type === 'new_topic') {
                        console.log('Nuevo tópico recibido 1:', msg.message.topic_name);
                        console.log('Nueva notificacion recibida recibido 1:', msg.message.notification_message);
                        this.newTopicReceived.next(msg.message);
                    }
                    if (msg.message.type === 'connection_count') {
                        console.log('Número de conexiones activas:', msg.message.active_connections);
                    }
                    // Manejar las notificaciones generales
                    if (msg.message.type === 'notification') {
                      console.log('Nueva notificación recibida:', msg.message.topic_name);
                        this.notificationsReceived.next(msg.message);
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
