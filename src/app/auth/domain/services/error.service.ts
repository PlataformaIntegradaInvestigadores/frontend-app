import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    handleError(error: any) {
      throw new Error('Method not implemented.');
    }

    /**
     * Procesa los errores de la respuesta de la API y extrae los mensajes de error.
     * @param errors - Los errores de la respuesta de la API.
     * @returns Una lista de mensajes de error.
     */
    processErrors(errors: any): string[] {
        let errorMessages: string[] = [];

        if (errors.error) {
            if (errors.error.detail) {
                errorMessages.push(errors.error.detail);
            } else {
                for (const key in errors.error) {
                    if (errors.error.hasOwnProperty(key)) {
                        const errorArray = errors.error[key];
                        if (Array.isArray(errorArray)) {
                            errorArray.forEach(err => {
                                errorMessages.push(err);
                            });
                        } else {
                            errorMessages.push(errorArray);
                        }
                    }
                }
            }
        } else {
            errorMessages.push('Incorrect email or password.');
        }

        return errorMessages;
    }
}
