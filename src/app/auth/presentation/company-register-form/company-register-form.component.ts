import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../domain/services/auth.service';
import { passwordMatchValidator } from '../../domain/entities/custom-validators';
import { Company, INDUSTRY_OPTIONS, EMPLOYEE_COUNT_OPTIONS } from '../../domain/entities/interfaces';
import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'app-company-register-form',
    templateUrl: './company-register-form.component.html',
    styleUrls: ['./company-register-form.component.css']
})
export class CompanyRegisterFormComponent implements OnInit {
    @Output() registerSuccess = new EventEmitter<void>();
    
    registerForm: FormGroup = new FormGroup({});
    errorMessages: string[] = [];
    isLoading: boolean = false;
    industryOptions = INDUSTRY_OPTIONS;
    employeeCountOptions = EMPLOYEE_COUNT_OPTIONS;
    
    // Step wizard properties
    currentStep: number = 1;
    totalSteps: number = 4;
    
    steps = [
        { id: 1, title: 'Company Info', description: 'Basic company information' },
        { id: 2, title: 'Contact Details', description: 'Contact information' },
        { id: 3, title: 'Account Security', description: 'Password and security' },
        { id: 4, title: 'Terms & Finish', description: 'Review and complete' }
    ];

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) { }

    ngOnInit(): void {        this.registerForm = this.fb.group({
            company_name: ['', Validators.required],
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirm_password: ['', Validators.required],
            industry: [''],
            employee_count: [''],
            description: [''],
            website: [''],
            phone: [''],
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

        this.isLoading = true;
        this.errorMessages = [];

        const formValues = { ...this.registerForm.value };
        // Encriptar la contraseña
        const encryptedPassword = CryptoJS.SHA256(formValues.password).toString();
        
        delete formValues.agree_terms;

        const company: Company = {
            ...formValues,
            password: encryptedPassword,
            confirm_password: encryptedPassword,
            id: null
        };

        this.authService.registerCompany(company).subscribe({
            next: response => {
                this.isLoading = false;
                this.registerSuccess.emit();
            },
            error: error => {
                this.isLoading = false;
                this.errorMessages = error.message.split('\n');
            }
        });
    }    /**
     * Navigate to the next step
     */
    nextStep(): void {
        if (this.isCurrentStepValid() && this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.errorMessages = [];
        }
    }

    /**
     * Navigate to the previous step
     */
    previousStep(): void {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.errorMessages = [];
        }
    }

    /**
     * Go to a specific step
     */
    goToStep(step: number): void {
        if (step >= 1 && step <= this.totalSteps) {
            // Only allow going back or to completed steps
            if (step <= this.currentStep || this.isStepCompleted(step - 1)) {
                this.currentStep = step;
                this.errorMessages = [];
            }
        }
    }

    /**
     * Check if current step is valid
     */
    isCurrentStepValid(): boolean {
        const step1Fields = ['company_name'];
        const step2Fields = ['username'];
        const step3Fields = ['password', 'confirm_password'];
        const step4Fields = ['agree_terms'];

        switch (this.currentStep) {
            case 1:
                return step1Fields.every(field => {
                    const control = this.registerForm.get(field);
                    return control?.valid || false;
                });
            case 2:
                return step2Fields.every(field => {
                    const control = this.registerForm.get(field);
                    return control?.valid || false;
                });
            case 3:
                return step3Fields.every(field => {
                    const control = this.registerForm.get(field);
                    return control?.valid || false;
                }) && !this.registerForm.errors?.['passwordMismatch'];
            case 4:
                return step4Fields.every(field => {
                    const control = this.registerForm.get(field);
                    return control?.valid || false;
                });
            default:
                return false;
        }
    }

    /**
     * Check if a step is completed
     */
    isStepCompleted(step: number): boolean {
        const tempCurrentStep = this.currentStep;
        this.currentStep = step;
        const isValid = this.isCurrentStepValid();
        this.currentStep = tempCurrentStep;
        return isValid;
    }

    /**
     * Get progress percentage
     */
    getProgress(): number {
        return (this.currentStep / this.totalSteps) * 100;
    }

    /**
     * Evita la entrada de caracteres no alfabéticos.
     * @param event - El evento del teclado.
     */
    preventNonAlphabetic(event: KeyboardEvent): void {
        const regex = /^[a-zA-Z\s]*$/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!regex.test(inputChar)) {
            event.preventDefault();
        }
    }

    /**
     * Capitaliza la primera letra de cada palabra en el input.
     * @param event - El evento del input.
     */
    capitalizeInput(event: any): void {
        const value = event.target.value;
        const capitalizedValue = value.replace(/\b\w/g, (l: string) => l.toUpperCase());
        event.target.value = capitalizedValue;
        
        // Actualizar el valor del formulario
        const controlName = event.target.getAttribute('formControlName');
        if (controlName) {
            this.registerForm.get(controlName)?.setValue(capitalizedValue);
        }
    }
}
