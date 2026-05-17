import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthenticatedResponse, UserDetailsResponse } from '../../types/AssetTypes';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(
        private http: HttpClient
    ) {

    }

    login(payload: FormData): Observable<AuthenticatedResponse> {
        return this.http.post<AuthenticatedResponse>(`${environment.apiUrl}/auth/login`, payload);
    }

    getUserDetails(role : string) : Observable<UserDetailsResponse>{
        return this.http.get<UserDetailsResponse>(`${environment.apiUrl}/auth/get_auth_user`, {
            headers : {'role' : role}
        });
    }

}
