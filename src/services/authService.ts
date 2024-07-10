import api from '@/lib/axios';
import { logInForm } from '@/types/formType';

export const signUp = async (signUpData: logInForm) => {
  const response = await api.post('/api/auth/sign-up', signUpData);
  return response.data;
};

export const logIn = async (logInData: logInForm) => {
  const response = await api.post('/api/auth/log-in', logInData);
  return response.data;
};

export const logOut = async () => {
  const response = await api.delete('/api/auth/log-out');
  return response.data;
};

export const getUser = async () => {
  const response = await api.get('/api/auth/me');
  return response.data;
};
