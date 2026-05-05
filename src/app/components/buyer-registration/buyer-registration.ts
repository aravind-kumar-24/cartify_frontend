import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/Registration/registration-service';

@Component({
    selector: 'app-buyer-registration',
    imports: [MatIconModule, RouterLink, FormsModule, ReactiveFormsModule, MatSnackBarModule],
    templateUrl: './buyer-registration.html',
    styleUrl: './buyer-registration.css',
})
export class BuyerRegistration implements OnInit {

    appName : string = '';
    activeBuyers : number = 0;

    buyerFormBuilder !: FormGroup;

    constructor(
        private formBuilder : FormBuilder,
        private registrationService : RegistrationService,
        private snackBar : MatSnackBar
    ){

    }

    ngOnInit(): void {
        this.appName = environment.appName;

        this.buyerRegistrationForm();
    }

    buyerRegistrationForm(){
        this.buyerFormBuilder = this.formBuilder.group({
            'first_name' : ['', [Validators.required]],
            'last_name' : ['', [Validators.required]],
            'email_id' : ['', [Validators.required, Validators.email]],
            'mobile_number' : ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
            'password' : ['', [Validators.required, Validators.minLength(10)]],
            'confirm_password' : ['', [Validators.required]],
            'terms_and_conditions' : [false, [Validators.requiredTrue]]
        }, {validators : this.passwordMissmatchValidator})
    }

    passwordMissmatchValidator(form: FormGroup){
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirm_password')?.value;
        return password === confirmPassword ? null : {passwordMismatch : true}
    }

    blockSpace(event: KeyboardEvent, field: string): void {
        if (event.key !== ' ') return;

        if (field === 'first_name' || field === 'last_name') {
            const input = event.target as HTMLInputElement;
            const cursorPos = input.selectionStart ?? 0;
            const value = input.value;
            if (cursorPos === 0 || value[cursorPos - 1] === ' ') {
                event.preventDefault();
            }
        } else {
            event.preventDefault();
        }
    }

    restrictionsOnInput(field: string){
        const input = this.buyerFormBuilder.get(field);
        if(!input) return;

        let value = input.value;

        if(field === 'first_name' || field === 'last_name'){
            value = value.replace(/^\s+/, '');
            value = value.replace(/\s{2,}/g, ' ')
        }else if(field === 'email_id' || field === 'password' || field === 'confirm_password'){
            value = value.replace(/\s/g, '');
        }else if(field === 'mobile_number'){
            value = value.replace(/\s/g, '');     
            value = value.replace(/[^0-9]/g, '');
        }

        input.setValue(value, {emitEvent:false});
    }

    showToast(message: string, type: 'success' | 'error') {
        this.snackBar.open(message, 'Close', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: type === 'success' ? ['snack-success'] : ['snack-error']
        });
    }

    onSubmit(){

        if(this.buyerFormBuilder.invalid){
            this.buyerFormBuilder.markAllAsTouched();
            return;
        }

        const {confirm_password, terms_and_conditions, ...payload} = this.buyerFormBuilder.value;

        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
            formData.append(key, value as string);
        })

        this.registrationService.registerBuyer(formData).subscribe({
            next : (response) => {
                console.log(response);
                this.showToast(response.message, 'success');
                this.buyerFormBuilder.reset()
            },
            error : (error) => {
                console.log(error);
                const message = error?.error?.message || 'Something went wrong!';
                this.showToast(message, 'error');
            }
        })


    }
}
