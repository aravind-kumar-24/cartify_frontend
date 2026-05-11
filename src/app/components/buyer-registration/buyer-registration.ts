import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/Registration/registration-service';
import { ToasterService } from '../../services/Toaster/toaster-service';
import { LoaderService } from '../../services/Loader/loader-service';
import { InputValidationHelper } from '../../helpers/InputValidationHelper';

@Component({
    selector: 'app-buyer-registration',
    imports: [MatIconModule, RouterLink, FormsModule, ReactiveFormsModule],
    templateUrl: './buyer-registration.html',
    styleUrl: './buyer-registration.css',
})
export class BuyerRegistration implements OnInit {

    appName : string = '';
    activeBuyers : number = 0;
    buyerFormBuilder !: FormGroup;
    showPassword : boolean = false;
    showConfirmPassword : boolean = false;

    constructor(
        private formBuilder : FormBuilder,
        private registrationService : RegistrationService,
        private toaster : ToasterService,
        private loader : LoaderService,
        private route : Router
    ){

    }

    ngOnInit(): void {
        this.appName = environment.appName;

        this.activeBuyersCount();

        this.buyerRegistrationForm();
    }

    activeBuyersCount(){
        this.loader.show();
        this.registrationService.getCount('buyer').subscribe({
            next : (response) => {
                this.activeBuyers = response.count;
            }, 
            error : (error) => {
                this.loader.hide();
                const message = error.error?.message || 'Failed to fetch the Buyers count!';
                this.toaster.error(message)
            }, 
            complete : () => {
                this.loader.hide();
            }
        })
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
        }, {validators : InputValidationHelper.passwordMissmatchValidator})
    }

    blockSpace(event: KeyboardEvent, field: string): void {
        InputValidationHelper.blockSpace(event, field);
    }

    restrictionsOnInput(field: string): void {
        const input = this.buyerFormBuilder.get(field);
        if (!input) return;
        const cleaned = InputValidationHelper.restrictionsOnInput(input.value, field);
        input.setValue(cleaned, { emitEvent: false });
    }

    togglePassword(){
        this.showPassword = !this.showPassword;
    }

    toggleConfirmPassword(){
        this.showConfirmPassword = !this.showConfirmPassword;
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

        this.loader.show();

        this.registrationService.registerBuyer(formData).subscribe({
            next : (response) => {
                this.toaster.success(response.message);
                this.buyerFormBuilder.reset();
                this.route.navigate(['/auth/login']);
            },
            error : (error) => {
                const message = error?.error?.message || 'Something went wrong!';
                this.toaster.error(message);
                this.loader.hide();
            },
            complete : () => {
                this.loader.hide();
            }
        })

    }
}
