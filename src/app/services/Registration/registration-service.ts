import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class RegistrationService {

    constructor(
        private http : HttpClient
    ){

    }

    registerBuyer(payload : FormData): Observable<any>{
        return this.http.post(`${environment.apiUrl}/register/buyer_register`, payload);
    }

}
