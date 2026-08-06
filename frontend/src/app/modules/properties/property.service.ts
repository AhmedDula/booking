import { Service, inject } from '@angular/core';
import { firstValueFrom , Observable} from 'rxjs';
import { Property,APIResponse } from './property.model';
import { ApiService } from '../../core/services/api.service';
import { Room } from '../rooms/room.model';

@Service()
export class PropertyService {
  private api = inject(ApiService);
    private endpoint = 'properties';

  // getProperties(): Observable<any> {
  //   return this.api.get<APIResponse<Property[]>>(this.endpoint)

  // }

  getProperties():Promise<Property[]>{
    return firstValueFrom(this.api.get<APIResponse<Property[]>>(`${this.endpoint}`))
    .then(res => res.data);
  }
  getPropertyById(id: string): Promise<Property> {
    return firstValueFrom(
      this.api.get<APIResponse<Property>>(`${this.endpoint}/update/${id}`)
    ).then(res => res.data);
  }

  getRoomsByPropertyId(id: string): Promise<Room[]> {
    return firstValueFrom(
      this.api.get<APIResponse<Room[]>>(`${this.endpoint}/${id}/rooms`)
    ).then(res => res.data);
  }

  createProperty(property: Omit<Property, '_id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    return firstValueFrom(this.api.post<Property>(this.endpoint, property));
  }
  updateProperty(id: string, property: Property): Promise<Property> {
    return firstValueFrom(this.api.put<Property>(`${this.endpoint}/update/${id}`, property));
  }
  deleteProperty(id: string): Promise<void> {
    return firstValueFrom(this.api.delete<void>(`${this.endpoint}/remove/${id}`));
  }
}