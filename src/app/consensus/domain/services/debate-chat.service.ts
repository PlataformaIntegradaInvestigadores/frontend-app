import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DebateChatService {
  private socket$!: WebSocketSubject<any>;
  private baseUrl = `${environment.wsUrl}/chat`;

  /**
   * Conecta al WebSocket utilizando el token almacenado en localStorage.
   * @param groupId ID del grupo.
   * @param debateId ID del debate.
   */
  connect(groupId: string, debateId: string): void {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      console.error('El token no está disponible en localStorage.');
      return;
    }
  
    const url = `${this.baseUrl}/${groupId}/${debateId}/?token=${token}`;
    
    this.socket$ = webSocket({
      url: url,
      deserializer: (msg) => JSON.parse(msg.data),
      serializer: (value) => JSON.stringify(value),
      closeObserver: {
        next: () => {
          console.log('Conexión cerrada. Intentando reconectar...');
          setTimeout(() => this.connect(groupId, debateId), 5000); // Reintentar en 5 segundos
        },
      },
      openObserver: {
        next: () => console.log('Conexión establecida con WebSocket'),
      },
    });
  
    this.socket$.subscribe({
      next: (msg) => console.log('Mensaje recibido:', msg),
      error: (err) => console.error('Error en WebSocket:', err),
      complete: () => console.log('Conexión finalizada.'),
    });
  }
  
  

  /**
   * Envía un mensaje al WebSocket.
   * @param message El mensaje a enviar.
   */
  sendMessage(message: string, posture: string): void {
    if (this.socket$) {
      this.socket$.next({
        text: message,
        posture: posture, // Incluye la postura del usuario
      });
    }
  }
  

  /**
   * Obtiene los mensajes del WebSocket como un observable.
   */
  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  /**
   * Cierra la conexión del WebSocket.
   */
  disconnect(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
  }

  
}
