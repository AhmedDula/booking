import { Service, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Dispute } from './dispute.model';

@Service()
export class DisputeService {
  private api = inject(ApiService);
  private endpoint = 'disputes';

  getDisputes(): Promise<Dispute[]> {
    return firstValueFrom(this.api.get<Dispute[]>(this.endpoint));
  }

  getDisputeById(id: string): Promise<Dispute> {
    return firstValueFrom(this.api.get<Dispute>(`${this.endpoint}/${id}`));
  }
  
  createDispute(dispute: Omit<Dispute, '_id' | 'createdAt' | 'updatedAt'>): Promise<Dispute> {
    return firstValueFrom(this.api.post<Dispute>(this.endpoint, dispute));
  }

  updateDispute(id: string, dispute: Dispute): Promise<Dispute> {
    return firstValueFrom(this.api.put<Dispute>(`${this.endpoint}/${id}`, dispute));
  }
  updateDisputeStatus(id: string, status: Dispute['status'], resolutionNotes?: string): Promise<Dispute> {
    const body: Partial<Dispute> = { status };
    if (resolutionNotes) {
      body.resolutionNotes = resolutionNotes;
    }
    return firstValueFrom(this.api.put<Dispute>(`${this.endpoint}/${id}`, body));
  }

  deleteDispute(id: string): Promise<void> {
    return firstValueFrom(this.api.delete<void>(`${this.endpoint}/${id}`));
  }
}