import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../domain/entities/auth.service';
import { passwordMatchValidator } from '../../domain/entities/custom-validators';
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  errorMessages: string[] = [];
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),
      ]],
      confirm_password: ['', Validators.required],
      scopus_id: ['', Validators.pattern(/^[0-9]*$/)],
      agree_terms: [false, Validators.requiredTrue]
    }, { validators: passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessages = ['Please fill in all required fields correctly.'];
      return;
    }

    const formValues = this.registerForm.value;
    const user = {
      ...formValues,
      scopus_id: formValues.scopus_id ? formValues.scopus_id : null
    };
    delete user.confirm_password;
    delete user.agree_terms;

    console.log('Registering user', user);

    this.authService.register(user).subscribe({
      next: response => {
        console.log('Registration successful', response);
        // Handle successful registration here
        this.router.navigate(['/login']);
      },
      error: error => {
        this.errorMessages = error.message.split('\n');
      }
    });
  }


  preventNonNumeric(event: KeyboardEvent): void {
    if (event.key < '0' || event.key > '9') {
      event.preventDefault();
    }
  }
}
