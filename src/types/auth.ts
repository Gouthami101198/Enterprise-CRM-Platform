export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  avatar?: string;
}

export type AuthView = 'login' | 'signup' | 'forgot-password';

