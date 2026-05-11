import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { BuyerLayout } from './layouts/buyer-layout/buyer-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Login } from './components/login/login';
import { SellerRegistration } from './components/seller-registration/seller-registration';
import { BuyerRegistration } from './components/buyer-registration/buyer-registration';

export const routes: Routes = [    
    
    { path: '', component: Home },
    {
        path: 'auth',
        component: AuthLayout,
        children: [
            { path: 'login', component: Login },
            { path: 'register-seller', component: SellerRegistration },
            { path: 'register-buyer', component: BuyerRegistration }
        ]
    },
    
    // {
    //     path: '',
    //     component: BuyerLayout,
    //     children: [
    //         { path: '', component: Home }
    //     ]
    // },
    
];
