import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { QueryParams, Paginated } from '../models/query-params.model';

/**
 * Generic CRUD base for a single REST resource.
 *
 * Extend this in a module service and pass the resource's endpoint segment:
 *
 *   @Injectable({ providedIn: 'root' })
 *   export class PropertyService extends BaseCrudService<Property> {
 *     constructor() {
 *       super('properties');
 *     }
 *     // add domain-specific methods here (search, availability, etc.)
 *   }
 *
 * This gives every module identical getAll/getById/create/update/patch/remove
 * behavior without re-implementing HttpClient plumbing in each service.
 */
export abstract class BaseCrudService<T extends { id: string }> {
  protected readonly api = inject(ApiService);

  protected constructor(protected readonly endpoint: string) {}

  getAll(query?: QueryParams): Observable<T[]> {
    return this.api.get<T[]>(this.endpoint, query);
  }

  getAllPaginated(query?: QueryParams): Observable<Paginated<T>> {
    return this.api.get<Paginated<T>>(this.endpoint, query);
  }

  getById(id: string): Observable<T> {
    return this.api.get<T>(`${this.endpoint}/${id}`);
  }

  create(dto: Partial<T>): Observable<T> {
    return this.api.post<T>(this.endpoint, dto);
  }

  update(id: string, dto: Partial<T>): Observable<T> {
    return this.api.put<T>(`${this.endpoint}/${id}`, dto);
  }

  patch(id: string, dto: Partial<T>): Observable<T> {
    return this.api.patch<T>(`${this.endpoint}/${id}`, dto);
  }

  remove(id: string): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
