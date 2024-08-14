import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../domain/services/auth.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../domain/services/error.service';
import { LoginCredentials } from '../../domain/entities/interfaces';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessages: string[] = [];

  constructor(
    private title: Title,
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
    this.title.setTitle("Login");
  }

  /**
   * Maneja el envío del formulario de inicio de sesión.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      // Encriptar la contraseña
      const encryptedPassword = CryptoJS.SHA256(formData.password).toString();
      const loginData: LoginCredentials = {
        username: formData.username,
        password: encryptedPassword
      };

      this.authService.login(loginData).subscribe(
        response => {
          const userId = this.authService.getUserId();
          if (userId) {
            this.router.navigate([`/profile/${userId}/about-me`]);
          }
        },
        error => {
          this.processErrors(error);
        }
      );
    } else {
      this.errorMessages = ['Please fill in all required fields correctly.'];
    }
  }

  /**
   * Procesa los errores de la respuesta de la API y actualiza los mensajes de error.
   * @param errors - Los errores de la respuesta de la API.
   */
  private processErrors(errors: any): void {
    this.errorMessages = this.errorService.processErrors(errors);
    console.error('Error logging in', this.errorMessages);
  }
}
