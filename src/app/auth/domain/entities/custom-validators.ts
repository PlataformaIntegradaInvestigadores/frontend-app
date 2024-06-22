import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Validador personalizado para comprobar que los campos de contraseña coincidan.
 * @param control - El control del formulario que contiene los campos de contraseña.
 * @returns Un objeto de errores de validación o null si no hay errores.
 */
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
