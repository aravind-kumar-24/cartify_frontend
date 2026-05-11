import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/Registration/registration-service';
import { ToasterService } from '../../services/Toaster/toaster-service';
import { LoaderService } from '../../services/Loader/loader-service';
import { CommonModule } from '@angular/common';
import { InputValidationHelper } from '../../helpers/InputValidationHelper';
import { MatIconModule } from '@angular/material/icon';
import { AssetsService} from '../../services/Assets/assets-service';
import { BusinessType, States, Cities } from '../../types/AssetTypes';


@Component({
    selector: 'app-seller-registration',
    imports: [RouterLink, CommonModule, ReactiveFormsModule, MatIconModule],
    templateUrl: './seller-registration.html',
    styleUrl: './seller-registration.css',
})
export class SellerRegistration implements OnInit {
    appName: string = '';
    activeSellers: number = 0;
    sellerFormBuilder !: FormGroup;
    showPassword: boolean = false;
    showConfirmPassword: boolean = false;
    businessTypes: BusinessType[] = [];
    states: States[] = [];
    cities: Cities[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private registrationService: RegistrationService,
        private toaster: ToasterService,
        private loader: LoaderService,
        private assets: AssetsService,
        private route : Router
    ) {

    }

    ngOnInit(): void {
        this.appName = environment.appName;

        this.activeSellersCount()

        this.sellerRegistrationForm();

        this.getBusinessTypes();

        this.getStates();
    }

    activeSellersCount(){
        this.loader.show();
        this.registrationService.getCount('seller').subscribe({
            next : (response) => {
                this.activeSellers = response.count;
            }, 
            error : (error) => {
                this.loader.hide();
                const message = error.error?.message || 'Failed to fetch the Sellers count!';
                this.toaster.error(message)
            }, 
            complete : () => {
                this.loader.hide();
            }
        })
    }

    sellerRegistrationForm() {
        this.sellerFormBuilder = this.formBuilder.group({
            'first_name': ['', [Validators.required]],
            'last_name': ['', [Validators.required]],
            'email_id': ['', [Validators.required, Validators.email]],
            'mobile_number': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
            'password': ['', [Validators.required, Validators.minLength(10)]],
            'confirm_password': ['', [Validators.required]],
            'business_name': ['', [Validators.required]],
            'business_type': ['', [Validators.required]],
            'business_address': ['', [Validators.required]],
            'city': ['', [Validators.required]],
            'state': ['', [Validators.required]],
            'pincode': ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
            'terms_and_conditions': [false, [Validators.requiredTrue]]
        }, { validators: InputValidationHelper.passwordMissmatchValidator })
    }

    getBusinessTypes() {
        this.loader.show();
        this.assets.getBusinessTypes().subscribe({
            next: (response) => {
                this.businessTypes = response.business_types;
            },
            error: (error) => {
                const message = error?.error?.message || 'Failed to load Business Types';
                this.toaster.error(message);
                this.loader.hide();
            },
            complete: () => {
                this.loader.hide();
            }
        })
    }

    getStates() {
        this.loader.show();
        this.assets.getStates().subscribe({
            next: (response) => {
                this.states = response.states;
            },
            error: (error) => {
                const message = error?.error?.message || 'Failed to load States';
                this.toaster.error(message);
                this.loader.hide();
            },
            complete: () => {
                this.loader.hide();
            }
        })
    }

    getCities(event: Event) {
        const stateId = +(event.target as HTMLSelectElement).value;

        this.sellerFormBuilder.get('city')?.setValue('');
        this.cities = [];

        if(!stateId) return;

        this.loader.show();

        this.assets.getCities(stateId).subscribe({
            next: (response) => {
                this.cities = response.cities;
            },
            error: (error) => {
                const message = error?.error?.message || 'Failed to load Cities';
                this.toaster.error(message);
                this.loader.hide();
            },
            complete: () => {
                this.loader.hide();
            }
        })
    }

    togglePassword() {
        this.showPassword = !this.showPassword;
    }

    toggleConfirmPassword() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    blockSpace(event: KeyboardEvent, field: string): void {
        InputValidationHelper.blockSpace(event, field);
    }

    restrictionsOnInput(field: string): void {
        const input = this.sellerFormBuilder.get(field);
        if (!input) return;
        const cleaned = InputValidationHelper.restrictionsOnInput(input.value, field);
        input.setValue(cleaned, { emitEvent: false });
    }

    onSubmit() {
        if (this.sellerFormBuilder.invalid) {
            this.sellerFormBuilder.markAllAsTouched();
            return;
        }

        const { confirm_password, terms_and_conditions, ...payload } = this.sellerFormBuilder.value;

        const formData = new FormData();

        Object.entries(payload).forEach(([key, value]) => {
            formData.append(key, value as string);
        })

        this.loader.show();

        this.registrationService.registerSeller(formData).subscribe({
            next: (response) => {
                this.toaster.success(response.message);
                this.sellerFormBuilder.reset();
                this.route.navigate(['/auth/login']);
            },
            error: (error) => {
                const message = error?.error?.message || 'Something went wrong!';
                this.toaster.error(message);
                this.loader.hide();
            },
            complete: () => {
                this.loader.hide();
            }
        })
    }
}
