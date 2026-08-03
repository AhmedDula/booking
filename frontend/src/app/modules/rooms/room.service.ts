// import { Injectable, inject, Service } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// import { Room } from './room.model';
// import { environment } from '../../../environments/environment.development';

// @Service()
// export class RoomService {
//   private apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient) {}
//   private http = inject(HttpClient);

//   private api = `${environment.apiUrl}/products`;

//   getProducts(): Observable<Room[]> {
//     return this.http.get<Room[]>(this.api);
//   }

//   getProduct(id: string): Observable<Room> {
//     return this.http.get<Room>(`${this.api}/${id}`);
//   }

//   createProduct(product: Room): Observable<Room> {
//     return this.http.post<Room>(this.api, product);
//   }

//   updateProduct(id: string, product: Room): Observable<Room> {
//     return this.http.put<Room>(`${this.api}/${id}`, product);
//   }

//   deleteProduct(id: string) {
//     return this.http.delete(`${this.api}/${id}`);
//   }
// }
