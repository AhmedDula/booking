import { ROLES } from '../../core/constants/roles';

export interface Auth {
  id: string;
  name: string;
  email: string;
  role: typeof ROLES[keyof typeof ROLES];
  createdAt: string;
}