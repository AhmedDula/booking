import { Injectable, inject } from '@angular/core';
import { Room, APIResponse } from './room.model';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private api = inject(ApiService);
  private endpoint = 'rooms';

  getRooms(): Promise<Room[]> {
    return firstValueFrom(this.api.get<APIResponse<Room[]>>(this.endpoint))
    .then(res => res.data);
  }

  //for booking
  getRoomById(id: string): Observable<any> {
    return this.api.get<APIResponse<Room>>(this.endpoint)
    
  }
  createRoom(room: Omit<Room, '_id' | 'createdAt' | 'updatedAt'>): Promise<Room> {
    return firstValueFrom(this.api.post<Room>(this.endpoint, room));
  }

  updateRoom(id: string, room: Room): Promise<Room> {
    return firstValueFrom(this.api.put<Room>(`${this.endpoint}/${id}`, room));
  }

  deleteRoom(id: string): Promise<void> {
    return firstValueFrom(this.api.delete<void>(`${this.endpoint}/${id}`));
  }
}
