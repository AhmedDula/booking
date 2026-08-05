import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Dispute } from './dispute.model';

@Injectable({
  providedIn: 'root'
})
export class DisputeService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/disputes`;

  getDisputeById(id: string){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getDisputes() {
    return this.http.get(`${this.baseUrl}`);
  }

  createDispute(dispute: Dispute) {
    return this.http.post(`${this.baseUrl}`, dispute);
  }

  updateDispute(id: string, dispute: Dispute) {
    return this.http.put(`${this.baseUrl}/${id}`, dispute);
  }

  deleteDispute(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateDisputeStatus(id: string, status: Dispute["status"]) {
    return this.http.patch(`${this.baseUrl}/${id}/status`, { status });
  }
}
