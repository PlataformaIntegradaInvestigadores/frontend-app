import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirm_password');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatch: true });
    } else if (confirmPassword) {
        confirmPassword.setErrors(null);
    }
    return null;
}
