import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";


export const authInterceptor : HttpInterceptorFn = ( req : HttpRequest<any>, next : HttpHandlerFn) : Observable<HttpEvent<any>> => {
    const router = inject(Router);
    const token = localStorage.getItem('token');

    const excludedRoutes = [
        '/register/buyer_register',
        '/register/seller_register',
        '/register/count',
        '/auth/login',
        '/assets/get_business_types',
        '/assets/get_states',
        '/assets/get_cities',
    ]

    const isExcluded = excludedRoutes.some(route => req.url.includes(route));

    if( isExcluded || !token){
        return next(req);
    }

    const clonedRequest = req.clone({
        headers : req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(clonedRequest).pipe(
        catchError((error : HttpErrorResponse) => {
            if(error.status == 401){
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('encrypted_role');
                router.navigate(['/auth/login'])
            }
            return throwError(()=>error);
        })
    )
}