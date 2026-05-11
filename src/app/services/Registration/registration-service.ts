import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CountResponse } from '../../types/AssetTypes';

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

    registerSeller(payload : FormData) : Observable<any>{
        return this.http.post(`${environment.apiUrl}/register/seller_register`, payload);
    }

    getCount(page : string) : Observable<CountResponse>{
        return this.http.get<CountResponse>(`${environment.apiUrl}/register/count/${page}`);
    }

}
