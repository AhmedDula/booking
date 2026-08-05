import { Injectable, Service, inject } from '@angular/core';

import { ApiService } from '../../core/services/api.service';

import { DisputeResponse, IDispute } from './dispute.model';
import { Observable } from 'rxjs';

@Service()
export class DisputeService {
  private readonly api = inject(ApiService)


  getDisputes(): Observable<DisputeResponse> {
    return this.api.get<DisputeResponse>(`/disputes`);
  }

  getDisputeById(id: string): Observable<DisputeResponse> {
    return this.api.get<DisputeResponse>(`/disputes/${id}`);
  }

  createDispute(dispute: IDispute): Observable<DisputeResponse> {
    return this.api.post<DisputeResponse>(`/disputes`, dispute)

  }

  updateDispute(id: string, dispute: DisputeResponse): Observable<DisputeResponse> {
    return this.api.put<DisputeResponse>(`/disputes/${id}`, dispute);
  }

  deleteDispute(id: string): Observable<DisputeResponse> {
    return this.api.delete<DisputeResponse>(`/disputes/${id}`);
  }
}
