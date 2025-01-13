// import { Component, Input } from '@angular/core';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { DebateChatService } from 'src/app/consensus/domain/services/debate-chat.service';

// @Component({
//   selector: 'app-debate-chat',
//   templateUrl: './debate-chat.component.html',
//   styleUrls: ['./debate-chat.component.css']
// })
// export class DebateChatComponent {
//   @Input() groupId!: string;
//   @Input() debateId!: number;
//   messages: { user: string; message: string }[] = [];

//   constructor(private chatService: DebateChatService, public activeModal: NgbActiveModal) {}

//   ngOnInit(): void {
//     if (!this.groupId || !this.debateId) {
//       console.error('groupId o debateId no están definidos:', this.groupId, this.debateId);
//       return;
//     }

//     console.log('Conectando al WebSocket con:', this.groupId, this.debateId);
//     this.chatService.connect(this.groupId, this.debateId);

//     this.chatService.getMessages().subscribe({
//       next: (data) => {
//         console.log('Nuevo mensaje recibido:', data);
//         this.messages.push(data);
//       },
//       error: (err) => {
//         console.error('Error al recibir mensajes:', err);
//       }
//     });
//   }

//   ngOnDestroy(): void {
//     this.chatService.disconnect(); // Cierra el WebSocket al destruir el componente
//   }

//   sendMessage(input: HTMLInputElement): void {
//     const message = input.value.trim();
//     if (message) {
//       this.chatService.sendMessage(message);
//       input.value = '';
//     }
//   }

//   closeModal(): void {
//     this.ngOnDestroy(); // Limpia los recursos antes de cerrar
//     this.activeModal.close(); // Cierra el modal
//   }

// }
