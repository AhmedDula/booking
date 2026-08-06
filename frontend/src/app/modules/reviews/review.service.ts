import { Service, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { APIResponse, Review } from './review.model';

@Service()
export class reviewService {

  private api = inject(ApiService);
  private endpoint = 'reviews';


  getAll(): Promise<Review[]> {

    return firstValueFrom(
      this.api.get<APIResponse<Review[]>>(this.endpoint)
    ).then(res => res.data);

  }

  getById(id: string): Promise<Review> {

    return firstValueFrom(
      this.api.get<APIResponse<Review>>(
        `${this.endpoint}/${id}`
      )
    ).then(res => res.data);

  }

  create(review: Review): Promise<Review> {

    return firstValueFrom(
      this.api.post<APIResponse<Review>>(
        this.endpoint,
        review
      )
    ).then(res => res.data);
}

  update(
    id: string,
    review: Review
  ): Promise<Review> {

    return firstValueFrom(
      this.api.patch<APIResponse<Review>>(
        `${this.endpoint}/${id}`,
        review
      )
    ).then(res => res.data);

  }


  softDelete(id: string): Promise<Review> {

    return firstValueFrom(
      this.api.patch<APIResponse<Review>>(
        `${this.endpoint}/soft-delete/${id}`,
        {}
      )
    ).then(res => res.data);

  }


  delete(id: string): Promise<any> {

    return firstValueFrom(
      this.api.delete<APIResponse<any>>(
        `${this.endpoint}/${id}`
      )
    ).then(res => res.data);

  }

}