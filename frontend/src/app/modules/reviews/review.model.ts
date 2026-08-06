export interface Review {
  _id?: string;
  rating: number;
  comment: string;
  user?: string;

  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface APIResponse<T> {
  data: T;
  success: boolean;
}