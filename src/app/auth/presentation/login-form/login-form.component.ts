import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../domain/services/auth.service';
import { ErrorService } from '../../domain/services/error.service';
import { LoginCredentials, UserType } from '../../domain/entities/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Output() loginSuccess = new EventEmitter<void>();
  @Input() userType: UserType = 'user';
  
  loginForm: FormGroup;
  errorMessages: string[] = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private errorService: ErrorService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Reset form and errors when component initializes
    this.loginForm.reset();
    this.errorMessages = [];
  }

  /**
   * Maneja el envío del formulario de inicio de sesión.
   */
  onSubmit(): void {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.errorMessages = [];
      
      const formData = this.loginForm.value;
      
      // Enviar contraseña en texto plano - el backend se encarga del hasheo
      const loginData: LoginCredentials = {
        username: formData.username,
        password: formData.password
      };      this.authService.login(loginData, this.userType).subscribe({
        next: (response) => {
          this.isLoading = false;
          const userId = this.userType === 'company' ? this.authService.getCompanyId() : this.authService.getUserId();
          if (userId) {
            this.loginSuccess.emit();
            // Pequeño delay para que el modal se cierre antes de navegar
            setTimeout(() => {
              if (this.userType === 'company') {
                // Navegar al perfil de empresa
                this.router.navigate([`/company/${userId}`]);
              } else {
                this.router.navigate([`/profile/${userId}/about-me`]);
              }
            }, 100);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.processErrors(error);
        }
      });
    } else {
      this.errorMessages = ['Please fill in all required fields correctly.'];
    }
  }

  /**
   * Procesa los errores de la respuesta de la API y actualiza los mensajes de error.
   */
  private processErrors(errors: any): void {
    this.errorMessages = this.errorService.processErrors(errors);
    console.error('Error logging in', this.errorMessages);
  }
}
