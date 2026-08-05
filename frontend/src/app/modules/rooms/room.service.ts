import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/rooms`;

  getRoomById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
