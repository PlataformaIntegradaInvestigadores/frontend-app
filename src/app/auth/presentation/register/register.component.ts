import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../domain/services/auth.service';
import { passwordMatchValidator } from '../../domain/entities/custom-validators';
import { Router } from "@angular/router";
import { User } from '../../domain/entities/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  errorMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required],
      scopus_id: ['', Validators.pattern(/^[0-9]*$/)],
      agree_terms: [false, Validators.requiredTrue]
    }, { validators: passwordMatchValidator });
  }

  /**
   * Maneja el envío del formulario de registro.
   */
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessages = ['Please fill in all required fields correctly.'];
      return;
    }

    const formValues = { ...this.registerForm.value };
    delete formValues.confirm_password;
    delete formValues.agree_terms;

    const user: User = {
      ...formValues,
      scopus_id: formValues.scopus_id ? formValues.scopus_id : null,
      id: null // Si necesitas inicializar el ID a null
    };

    this.authService.register(user).subscribe({
      next: response => {
        this.router.navigate(['/login']);
      },
      error: error => {
        this.errorMessages = error.message.split('\n');
      }
    });
  }

  /**
   * Evita la entrada de caracteres no alfabéticos.
   * @param event - El evento del teclado.
   */
  preventNonAlphabetic(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (!/[a-zA-Z\s]/.test(event.key)) {
      event.preventDefault();
    }
  }

  /**
   * Capitaliza la primera letra de cada palabra en la entrada del usuario.
   * @param event - El evento de entrada.
   */
  capitalizeInput(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  /**
   * Evita la entrada de caracteres no numéricos.
   * @param event - El evento del teclado.
   */
  preventNonNumeric(event: KeyboardEvent): void {
    if (event.key < '0' || event.key > '9') {
      event.preventDefault();
    }
  }
}
