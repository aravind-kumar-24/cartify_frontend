import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { ToasterService } from "../services/Toaster/toaster-service";

export const authGuard : CanActivateFn = () =>{
    const router = inject(Router);
    const toaster = inject(ToasterService);
    const token = localStorage.getItem('token');
    if(!token){
        toaster.warning('Entry Restricted');
        router.navigate(['/auth/login']);
        return false;
    }
    return true;
}