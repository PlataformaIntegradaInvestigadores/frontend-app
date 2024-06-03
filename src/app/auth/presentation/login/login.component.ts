import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../domain/entities/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessages: string[] = [];

  constructor(private title: Title, private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.title.setTitle("Login");
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe(
        response => {
          const userId = this.authService.getUserId();
          this.router.navigate([`/${userId}/about-me`]);
        },
        error => {
          this.processErrors(error);
        }
      );
    } else {
      this.errorMessages = ['Please fill in all required fields correctly.'];
    }
  }
  private processErrors(errors: any) {
    this.errorMessages = [];
    if (errors.error) {
      if (errors.error.detail) {
        this.errorMessages.push(errors.error.detail);
      } else {
        for (const key in errors.error) {
          if (errors.error.hasOwnProperty(key)) {
            const errorArray = errors.error[key];
            if (Array.isArray(errorArray)) {
              errorArray.forEach(err => {
                this.errorMessages.push(err);
              });
            } else {
              this.errorMessages.push(errorArray);
            }
          }
        }
      }
    } else {
      this.errorMessages.push('An unknown error occurred.');
    }
    console.error('Error logging in', this.errorMessages);
  }
}
