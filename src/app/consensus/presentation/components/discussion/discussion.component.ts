import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { DebateChatService } from 'src/app/consensus/domain/services/debate-chat.service';
import { ReactionService } from 'src/app/consensus/domain/services/reaction.service';
import { UserPostureService } from 'src/app/consensus/domain/services/user-posture.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit, OnDestroy, OnChanges {
  // @Input() isModalOpen: boolean = false;
  // debateId!: number;
  // groupId!: string;
  // @Output() closeModalEvent = new EventEmitter<void>();

  @Input() isModalOpen: boolean = false;
  @Input() debateIdInput!: number;
  @Input() groupIdInput!: string;
  @Output() closeChat = new EventEmitter<void>();

  // @Input() set debateIdInput(value: number) {
  //   this.debateId = value;
  // }

  // @Input() set groupIdInput(value: string) {
  //   this.groupId = value;
  // }

  debateIdString!: string;
  messages: any[] = [];
  newMessage = '';
  userPosture!: string;
  private subscription!: Subscription;
  currentUser: string = '';
  userColors: { [key: string]: string } = {}; // Mapa de colores para cada usuario


  constructor(
    private chatService: DebateChatService, 
    private reactionService: ReactionService,
    private userPostureService: UserPostureService
  ) {}

  ngOnInit(): void {
    if (this.debateIdInput) {
      this.initializeCurrentUser(); // Inicializa el usuario actual
      this.initializeChat();
      this.fetchUserPosture();
    } else {
      console.error('debateId no está definido en ngOnInit');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['debateId'] && changes['debateId'].currentValue) {
      console.log('Nuevo debateId recibido:', changes['debateId'].currentValue);
      this.initializeChat();
      this.fetchUserPosture();
    }
  }

  // private initializeChat(): void {
  //   if (!this.debateIdInput || !this.groupIdInput) {
  //     console.error('No se puede inicializar el chat sin debateId o groupId');
  //     return;
  //   }
  //   this.debateIdString = this.debateIdInput.toString();
  //   this.chatService.connect(this.groupIdInput, this.debateIdString);
  //   this.subscription = this.chatService.getMessages().subscribe((message) => {
  //     this.messages.push(message);
  //   });
  // }

  private initializeChat(): void {
    if (!this.debateIdInput || !this.groupIdInput) {
      return;
    }
    this.chatService.connect(this.groupIdInput, this.debateIdInput.toString());
    this.subscription = this.chatService.getMessages().subscribe((message) => {
      this.assignColorToUser(message.user); // Asignar un color único al usuario
      this.messages.push({
        ...message,
        timestamp: new Date(), // Puedes actualizar según el backend
      });
    });
  }

  private initializeCurrentUser(): void {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.currentUser = payload.username;
    } else {
      console.error('No se encontró el token de usuario.');
    }
  }

  private fetchUserPosture(): void {
    this.userPostureService.getUserPostureByDebate(this.debateIdInput).subscribe({
      next: (posture) => {
        this.userPosture = posture.posture; // Asigna la postura al componente
        console.log('Postura del usuario obtenida:', this.userPosture);
      },
      error: (err) => {
        console.error('Error al obtener la postura del usuario:', err);
        this.userPosture = 'neutral'; // Valor predeterminado si ocurre un error
      },
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.newMessage, this.userPosture); // Envía el mensaje con la postura
      this.newMessage = '';
    }
  }

  addReaction(messageId: number): void {
    this.reactionService.addReaction({ message: messageId }).subscribe((response) => {
      console.log('Reacción registrada:', response);
    });
  }

  closeModal(): void {
    this.closeChat.emit(); // Notifica al padre que se debe cerrar el modal
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Genera un color único para un usuario y lo guarda en el mapa de colores.
   * @param username Nombre del usuario.
   */
  private assignColorToUser(username: string): void {
    if (!this.userColors[username]) {
      // Generar un color único
      const color = this.generateColor(username);
      this.userColors[username] = color;
    }
  }

  /**
   * Genera un color basado en el hash del nombre de usuario.
   * @param username Nombre del usuario.
   * @returns Un color hexadecimal.
   */
  private generateColor(username: string): string {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 50%)`; // Genera un color HSL
    return color;
  }

  /**
   * Obtiene el color asignado a un usuario.
   * @param username Nombre del usuario.
   * @returns Color en formato CSS.
   */
  getUserColor(username: string): string {
    return this.userColors[username] || '#000000'; // Negro por defecto si no hay color asignado
  }
}