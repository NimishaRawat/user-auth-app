import { User } from '../models/user.model';

export interface AuthState {
  user: User | null;
  isExistingUser: boolean;
  error: string | null;
  step: number;
}

export const initialAuthState: AuthState = {
  user: null,
  isExistingUser: false,
  error: null,
  step: 1,
};
