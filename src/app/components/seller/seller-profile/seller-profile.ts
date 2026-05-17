import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/Auth/auth-service';
import { LoaderService } from '../../../services/Loader/loader-service';
import { ToasterService } from '../../../services/Toaster/toaster-service';

@Component({
    selector: 'app-seller-profile',
    imports: [],
    templateUrl: './seller-profile.html',
    styleUrl: './seller-profile.css',
})
export class SellerProfile implements OnInit {
    
    sellerDetails : any[] = [];

    constructor(
        private authService : AuthService,
        private loader : LoaderService,
        private toaster : ToasterService
    ){

    }

    ngOnInit(): void {
        this.getSellerDetails()
    }

    getSellerDetails(){
        const role = localStorage.getItem('encrypted_role');

        if(!role){
            this.toaster.error('Role not found!')
            return;
        }

        this.loader.show();
        this.authService.getUserDetails(role).subscribe({
            next : (response) => {
                this.sellerDetails = response.user_data;
            },
            error : (error)=>{
                console.log(error);
                this.loader.hide();
                const message = error.error?.message || 'Failed to fetch Seller Details!';
                this.toaster.error(message)
            },
            complete : () => {
                this.loader.hide();
            }
        })
    }
}
