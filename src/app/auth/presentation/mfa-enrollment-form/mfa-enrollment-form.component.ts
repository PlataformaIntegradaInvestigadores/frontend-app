import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../domain/services/auth.service';
import { MfaSetupResponse } from '../../domain/entities/interfaces';

@Component({
  selector: 'app-mfa-enrollment-form',
  templateUrl: './mfa-enrollment-form.component.html',
  styleUrls: ['./mfa-enrollment-form.component.css']
})
export class MfaEnrollmentFormComponent implements OnInit, OnDestroy {
  @Input({ required: true }) challenge!: string;
  @Input() expiresIn = 300;
  @Output() completed = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  mfaForm: FormGroup;
  setupData: MfaSetupResponse | null = null;
  errorMessages: string[] = [];
  isLoadingSetup = false;
  isSubmitting = false;
  remainingSeconds = 300;

  private challengeTimer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.mfaForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
    });
  }

  ngOnInit(): void {
    this.startChallengeTimer();
    this.loadEnrollmentSetup();
  }

  ngOnDestroy(): void {
    this.stopChallengeTimer();
  }

  onSubmit(): void {
    if (this.challengeExpired) {
      this.errorMessages = ['MFA setup expired. Please restart login to generate a new QR code.'];
      return;
    }

    if (this.mfaForm.invalid || this.isSubmitting || !this.challenge) {
      this.errorMessages = ['Enter the 6-digit verification code.'];
      return;
    }

    this.isSubmitting = true;
    this.errorMessages = [];

    const code = this.mfaForm.value.code;
    this.authService.confirmMfa(this.challenge, code).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.completed.emit();
      },
      error: error => {
        this.isSubmitting = false;
        this.errorMessages = ['Invalid verification code. Please try again.'];
      }
    });
  }

  retrySetup(): void {
    if (this.challengeExpired) {
      this.errorMessages = ['MFA setup expired. Please restart login to generate a new QR code.'];
      return;
    }

    this.loadEnrollmentSetup();
  }

  get challengeExpired(): boolean {
    return this.remainingSeconds <= 0;
  }

  get formattedRemainingTime(): string {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  private loadEnrollmentSetup(): void {
    if (!this.challenge) {
      this.errorMessages = ['The MFA challenge is no longer available.'];
      return;
    }

    if (this.challengeExpired) {
      this.errorMessages = ['MFA setup expired. Please restart login to generate a new QR code.'];
      return;
    }

    this.isLoadingSetup = true;
    this.errorMessages = [];

    this.authService.setupMfa(this.challenge).subscribe({
      next: setupData => {
        this.setupData = setupData;
        this.isLoadingSetup = false;
      },
      error: error => {
        this.isLoadingSetup = false;
        this.errorMessages = ['Unable to generate the QR code. Please restart login and try again.'];
      }
    });
  }

  private startChallengeTimer(): void {
    this.remainingSeconds = this.expiresIn || 300;
    this.challengeTimer = setInterval(() => {
      this.remainingSeconds = Math.max(this.remainingSeconds - 1, 0);
      if (this.challengeExpired) {
        this.stopChallengeTimer();
      }
    }, 1000);
  }

  private stopChallengeTimer(): void {
    if (this.challengeTimer) {
      clearInterval(this.challengeTimer);
      this.challengeTimer = null;
    }
  }
}
