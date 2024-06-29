import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private sockets: { [key: string]: WebSocketSubject<any> } = {};

  connect(groupId: string): WebSocketSubject<any> {
    if (!this.sockets[groupId] || this.sockets[groupId].closed) {
      console.log(`Creating new WebSocket connection for group: ${groupId}`);
      this.sockets[groupId] = webSocket(`${environment.wsUrl}/groups/${groupId}/`);
      this.sockets[groupId].subscribe(
        msg => console.log(`Message received on group ${groupId}:`, msg),
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
