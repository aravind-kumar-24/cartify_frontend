import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { LoaderService } from '../../services/Loader/loader-service';
import { ToasterService } from '../../services/Toaster/toaster-service';
import { InputValidationHelper } from '../../helpers/InputValidationHelper';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { userTypes } from '../../types/AssetTypes';
import { AuthService } from '../../services/Auth/auth-service';
import { RegistrationService } from '../../services/Registration/registration-service';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule, MatIconModule, RouterLink],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login implements OnInit {

    appName: string = '';
    activeUsers: number = 0;
    loginFormBuilder !: FormGroup;
    showPassword : boolean = false;
    showConfirmPassword : boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private loader: LoaderService,
        private toaster: ToasterService,
        private auth : AuthService,
        private registerService : RegistrationService,
        private router : Router
    ) {

    }

    ngOnInit(): void {
        this.appName = environment.appName;

        this.activeUsersCount();

        this.loginForm();
    }

    activeUsersCount(){
        this.loader.show();
        this.registerService.getCount('all').subscribe({
            next : (response) => {
                this.activeUsers = response.count;
            }, 
            error : (error) => {
                this.loader.hide();
                const message = error.error?.message || 'Failed to fetch the count!';
                this.toaster.error(message)
            }, 
            complete : () => {
                this.loader.hide();
            }
        })
    }

    loginForm() {
        this.loginFormBuilder = this.formBuilder.group({
            'user_type':['Buyer', [Validators.required]],
            'email_id': ['', [Validators.required, Validators.email]],
            'password' : ['', [Validators.required]]
        })
    }

    blockSpace(event: KeyboardEvent, field: string): void {
        InputValidationHelper.blockSpace(event, field);
    }

    restrictionsOnInput(field: string): void {
        const input = this.loginFormBuilder.get(field);
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

    setUserType(userType : userTypes){
        this.loginFormBuilder.reset();
        this.loginFormBuilder.get('user_type')?.setValue(userType);
        this.loginFormBuilder.get('user_type')?.markAllAsTouched();
    }

    onSubmit(){
        if(this.loginFormBuilder.invalid){
            this.loginFormBuilder.markAllAsTouched();
            return;
        }

        const payload = this.loginFormBuilder.value;

        const formData = new FormData();

        Object.entries(payload).forEach(([key, value]) => {
            formData.append(key, value as string);
        })

        this.loader.show();

        this.auth.login(formData).subscribe({
            next : (response) => {
                this.loginFormBuilder.reset();
                localStorage.setItem('token', response.access_token);
                localStorage.setItem('role', response.role);
                this.toaster.success(response.message);

                const role = response.role;

                if(role == 'Buyer'){
                    this.router.navigate(['/buyer/buyer-dashboard']);
                }else if(role == 'Seller'){
                    this.router.navigate(['/seller/seller-dashboard']);
                }
            },
            error : (error) => {
                this.loader.hide();
                const message = error.error?.message || 'Login failed';
                this.toaster.error(message);
            },
            complete : () => {
                this.loader.hide();
            }
        })
    }
}
