/**
 * Generic query params accepted by list endpoints (filtering, pagination, sorting).
 * Individual services can extend this with resource-specific filters.
 */
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Shape returned by paginated list endpoints.
 * Adjust to match the backend's actual envelope if it differs.
 */
export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
