import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../domain/services/auth.service';

@Component({
  selector: 'app-mfa-verify-form',
  templateUrl: './mfa-verify-form.component.html',
  styleUrls: ['./mfa-verify-form.component.css']
})
export class MfaVerifyFormComponent implements OnInit, OnDestroy {
  @Input({ required: true }) challenge!: string;
  @Input() expiresIn = 300;
  @Output() completed = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  verifyForm: FormGroup;
  errorMessages: string[] = [];
  isSubmitting = false;
  remainingSeconds = 300;

  private challengeTimer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.verifyForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
    });
  }

  ngOnInit(): void {
    this.startChallengeTimer();
  }

  ngOnDestroy(): void {
    this.stopChallengeTimer();
  }

  onSubmit(): void {
    if (this.challengeExpired) {
      this.errorMessages = ['MFA verification expired. Please restart login and try again.'];
      return;
    }

    if (this.verifyForm.invalid || this.isSubmitting || !this.challenge) {
      this.errorMessages = ['Enter the 6-digit verification code.'];
      return;
    }

    this.isSubmitting = true;
    this.errorMessages = [];

    const code = this.verifyForm.value.code;
    this.authService.verifyMfa(this.challenge, code).subscribe({
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

  get challengeExpired(): boolean {
    return this.remainingSeconds <= 0;
  }

  get formattedRemainingTime(): string {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
