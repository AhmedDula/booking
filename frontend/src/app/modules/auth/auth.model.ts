import { ROLES } from '../../core/constants/roles';

 export interface Auth {
  success: boolean;
  message: string;
  data: {
    user: {
      email: string;
      id: string;
      name: string;
      role: typeof ROLES[keyof typeof ROLES];
    };
  };
}