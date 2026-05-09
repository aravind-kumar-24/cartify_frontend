import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessTypeResponse, StatesResponse, CitiesResponse } from '../../types/AssetTypes';

@Injectable({
    providedIn: 'root',
})
export class AssetsService {
    constructor(
        private http: HttpClient
    ) {

    }

    getBusinessTypes(): Observable<BusinessTypeResponse> {
        return this.http.get<BusinessTypeResponse>(`${environment.apiUrl}/assets/get_business_types`);
    }

    getStates(): Observable<StatesResponse> {
        return this.http.get<StatesResponse>(`${environment.apiUrl}/assets/get_states`);
    }

    getCities(state_id: number): Observable<CitiesResponse> {
        return this.http.get<CitiesResponse>(`${environment.apiUrl}/assets/get_cities/${state_id}`);
    }
}
