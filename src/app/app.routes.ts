import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { BuyerLayout } from './layouts/buyer-layout/buyer-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Login } from './components/login/login';
import { SellerRegistration } from './components/seller-registration/seller-registration';
import { BuyerRegistration } from './components/buyer-registration/buyer-registration';
import { authGuard } from './guards/authGuard.guard';
import { SellerLayout } from './layouts/seller-layout/seller-layout';
import { roleBasedGuard } from './guards/roleBasedGuard.guard';
import { SellerDashboard } from './components/seller/seller-dashboard/seller-dashboard';
import { BuyerDashboard } from './components/buyer/buyer-dashboard/buyer-dashboard';
import { SellerProfile } from './components/seller/seller-profile/seller-profile';

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
    {
        path : 'buyer',
        component: BuyerLayout,
        canActivate: [authGuard, roleBasedGuard('Buyer')],
        canActivateChild: [authGuard, roleBasedGuard('Buyer')],
        children : [
            { path : 'buyer-dashboard', component : BuyerDashboard }
        ]
    },
    {
        path : 'seller',
        component : SellerLayout,
        canActivate : [authGuard, roleBasedGuard('Seller')],
        canActivateChild : [authGuard, roleBasedGuard('Seller')],
        children : [
            { path : 'seller-dashboard', component : SellerDashboard },
            { path : 'seller-profile', component : SellerProfile }
        ]
    },
    { path: '**', redirectTo: '/auth/login' }
];
