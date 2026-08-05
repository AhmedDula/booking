import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/properties`;

  getAllProperties() {
    return this.http.get<{data:any[]}>(this.baseUrl);
  }

  getPropertyById(id: string) {
    return this.http.get<any>('https://api.luxurybooking.com/api');
  }
}
