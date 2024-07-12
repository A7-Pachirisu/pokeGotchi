import { User } from '@supabase/supabase-js';
import { logInForm, signUpForm } from '../../types/formType';

export type AuthContextValue = {
  isInitialized: boolean;
  isLoggedIn: boolean;
  me: User | null;
  logIn: ({ email, password }: logInForm) => void;
  logOut: () => void;
  signUp: ({ email, password, passwordCheck }: signUpForm) => void;
  logInWithKakao: () => void;
};
