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


// import { Service, inject } from '@angular/core';
// import { firstValueFrom } from 'rxjs';
// import { Property,APIResponse } from './property.model';
// import { ApiService } from '../../core/services/api.service';
// import { Room } from '../rooms/room.model';

// @Service()
// export class PropertyService {
//   private api = inject(ApiService);
//     private endpoint = 'properties';

//   getProperties(): Promise<Property[]> {
//     return firstValueFrom(this.api.get<APIResponse<Property[]>>(this.endpoint))
//     .then(res => res.data);
//   }
//   getPropertyById(id: string): Promise<Property> {
//     return firstValueFrom(
//       this.api.get<APIResponse<Property>>(`${this.endpoint}/update/${id}`)
//     ).then(res => res.data);
//   }
//   getRoomsByPropertyId(id: string): Promise<Room[]> {
//     return firstValueFrom(
//       this.api.get<APIResponse<Room[]>>(`${this.endpoint}/${id}/rooms`)
//     ).then(res => res.data);
//   }
//   createProperty(property: Omit<Property, '_id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
//     return firstValueFrom(this.api.post<Property>(this.endpoint, property));
//   }
//   updateProperty(id: string, property: Property): Promise<Property> {
//     return firstValueFrom(this.api.put<Property>(`${this.endpoint}/update/${id}`, property));
//   }
//   deleteProperty(id: string): Promise<void> {
//     return firstValueFrom(this.api.delete<void>(`${this.endpoint}/remove/${id}`));
//   }
// }


