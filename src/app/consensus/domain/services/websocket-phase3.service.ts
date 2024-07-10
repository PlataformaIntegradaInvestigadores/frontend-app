import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { ConsensusResult } from '../entities/consensus-result.interface';

@Injectable({
  providedIn: 'root'
})
export class WebSocketPhase3Service {

  private groupSockets: { [key: string]: WebSocketSubject<any> } = {};
  public notificationReceived: Subject<ConsensusResult> = new Subject<ConsensusResult>();
  public userSatisfactionReceived: Subject<any> = new Subject<any>();

  connect(groupId: string): WebSocketSubject<any> {
    if (!this.groupSockets[groupId] || this.groupSockets[groupId].closed) {
      console.log(`Creating new WebSocket connection for group PHASE 3: ${groupId}`);
      this.groupSockets[groupId] = webSocket(`${environment.wsUrl}/phase3/groups/${groupId}/`);
      this.groupSockets[groupId].subscribe(
        message => this.handleMessage(groupId, message),
        error => console.error(`WebSocket error on group ${groupId}:`, error),
        () => console.log(`WebSocket connection closed for group ${groupId}`)
      );
    } else {
      console.log(`Reusing existing WebSocket connection for group: ${groupId}`);
    }
    return this.groupSockets[groupId];
  }

  private handleMessage(groupId: string, message: any): void {
    console.log(`Message received on WebSocket 3 for group ${groupId}:`, JSON.stringify(message, null, 2));

    if (message && message.message) {
      const { type, results, active_connections } = message.message;

      console.log('Message typeeeeeeeeeeeeeeeeee:', type);

      switch (type) {
        case 'connection_count':
          console.log('Active connections 33333333:', active_connections);
        break;
        case 'consensus_calculation_completed':
          this.notificationReceived.next(results);
          break;
        case 'user_satisfaction':
          console.log('User satisfaction notification received 3333333333:', message.message);
          this.userSatisfactionReceived.next(message.message);
          
          break;
        default:
          console.warn('Unknown message type:', type);
      }
    } else {
      console.warn('Received message with unexpected structure:', message);
    }
  }

  sendMessage(groupId: string, message: any): void {
    if (this.groupSockets[groupId]) {
      console.log(`Sending message to group ${groupId}:`, message);
      this.groupSockets[groupId].next(message);
    } else {
      console.warn(`No WebSocket connection found for group ${groupId} to send message.`);
    }
  }

  close(groupId: string): void {
    if (this.groupSockets[groupId]) {
      console.log(`Closing WebSocket connection for group: ${groupId}`);
      this.groupSockets[groupId].complete();
      delete this.groupSockets[groupId];
    } else {
      console.warn(`No WebSocket connection found for group ${groupId} to close.`);
    }
  }

  closeAll(): void {
    console.log('Closing all WebSocket connections for phase 3');
    for (const groupId in this.groupSockets) {
      this.groupSockets[groupId].complete();
    }
    this.groupSockets = {};
  }
}
