import api from '@/lib/axios';
import { logInForm } from '@/types/formType';

export const signUpService = async ({ email, password }: logInForm) => {
  const response = await api.post('/api/auth/sign-up', { email, password });
  return response.data;
};

export const logInService = async (logInData: logInForm) => {
  const response = await api.post('/api/auth/log-in', logInData);
  return response.data;
};

export const logInWithKaKaoService = async () => {
  const response = await api.get('/api/auth/provider');
  return response.data;
};

export const logOutService = async () => {
  const response = await api.delete('/api/auth/log-out');
  return response.data;
};

export const getUserService = async () => {
  try {
    const response = await api.get('/api/auth/me');
    return response.data;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }
};
