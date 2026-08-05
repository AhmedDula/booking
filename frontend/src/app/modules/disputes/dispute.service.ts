import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class DisputeService {
  private api = inject(ApiService);

  getDisputes() {
    return this.api.get('disputes');
  }

  updateStatus(id: string, status: string) {
    return this.api.patch(`disputes/${id}/status`, { status });
  }

  deleteDispute(id: string) {
    return this.api.delete(`disputes/${id}`);
  }
}
