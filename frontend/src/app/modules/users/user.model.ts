export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'guest' | 'admin' | 'concierge';
  avatar?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}