import { Service, inject } from '@angular/core';
import { Room, APIResponse } from './room.model';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

@Service()
export class RoomService {
  private api = inject(ApiService);
  private endpoint = 'rooms';

  getRooms(): Promise<Room[]> {
    return firstValueFrom(this.api.get<APIResponse<Room[]>>(this.endpoint))
    .then(res => res.data);
  }

  getRoomById(id: string): Promise<Room> {
    return firstValueFrom(this.api.get<APIResponse<Room>>(`${this.endpoint}/${id}`))
    .then(res => res.data);
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