import { Component, ElementRef, forwardRef, QueryList, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-mfa-code-input',
  templateUrl: './mfa-code-input.component.html',
  styleUrls: ['./mfa-code-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MfaCodeInputComponent),
      multi: true
    }
  ]
})
export class MfaCodeInputComponent implements ControlValueAccessor {
  @ViewChildren('digitInput') digitInputs!: QueryList<ElementRef<HTMLInputElement>>;

  digits = ['', '', '', '', '', ''];
  disabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    const code = this.onlyDigits(value || '').slice(0, 6);
    this.digits = this.digits.map((_, index) => code[index] || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = this.onlyDigits(input.value);

    if (!value) {
      this.digits[index] = '';
      input.value = '';
      this.emitCode();
      return;
    }

    if (value.length > 1) {
      this.applyCode(value, index);
      return;
    }

    this.digits[index] = value;
    input.value = value;
    this.emitCode();
    this.focusInput(index + 1);
  }

  handleKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.digits[index] && index > 0) {
      this.focusInput(index - 1);
    }
  }

  handlePaste(event: ClipboardEvent): void {
    const pastedCode = this.onlyDigits(event.clipboardData?.getData('text') || '');
    if (!pastedCode) {
      return;
    }

    event.preventDefault();
    this.applyCode(pastedCode, 0);
  }

  markTouched(): void {
    this.onTouched();
  }

  private applyCode(code: string, startIndex: number): void {
    const digits = this.onlyDigits(code).slice(0, 6 - startIndex).split('');
    digits.forEach((digit, offset) => {
      this.digits[startIndex + offset] = digit;
    });
    this.emitCode();
    this.focusInput(Math.min(startIndex + digits.length, 5));
  }

  private emitCode(): void {
    this.onChange(this.digits.join(''));
  }

  private focusInput(index: number): void {
    if (index < 0 || index > 5) {
      return;
    }

    setTimeout(() => {
      const input = this.digitInputs.toArray()[index]?.nativeElement;
      input?.focus();
      input?.select();
    });
  }

  private onlyDigits(value: string): string {
    return value.replace(/\D/g, '');
  }
}
