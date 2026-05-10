import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthenticatedResponse } from '../../types/AssetTypes';

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

}
