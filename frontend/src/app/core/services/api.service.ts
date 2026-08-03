import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { QueryParams } from '../models/query-params.model';

/**
 * Thin, generic wrapper around HttpClient.
 *
 * All module services should go through this (directly, or via BaseCrudService)
 * instead of injecting HttpClient themselves — it keeps the API base URL,
 * param-building, and request shape consistent across the app.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  private buildParams(query?: QueryParams): HttpParams {
    let params = new HttpParams();
    if (!query) {
      return params;
    }
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        params = params.set(key, String(value));
      }
    }
    return params;
  }

  private buildUrl(path: string): string {
    const trimmed = path.startsWith('/') ? path.slice(1) : path;
    return `${this.baseUrl}/${trimmed}`;
  }

  get<T>(path: string, query?: QueryParams): Observable<T> {
    return this.http.get<T>(this.buildUrl(path), { params: this.buildParams(query) });
  }

  post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<T>(this.buildUrl(path), body);
  }

  put<T>(path: string, body: unknown): Observable<T> {
    return this.http.put<T>(this.buildUrl(path), body);
  }

  patch<T>(path: string, body: unknown): Observable<T> {
    return this.http.patch<T>(this.buildUrl(path), body);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(this.buildUrl(path));
  }
}
