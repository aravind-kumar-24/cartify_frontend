import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { ToasterService } from "../services/Toaster/toaster-service";


export const roleBasedGuard = (expectedRole : string) : CanActivateFn => () => {
    const router = inject(Router);
    const toaster = inject(ToasterService);
    const role = localStorage.getItem('role');

    if(role !== expectedRole){
        toaster.warning('Entry Restricted')
        router.navigate(['/auth/login']);
        return false;
    }
    return true;
}