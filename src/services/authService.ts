import api from '@/lib/axios';

export const signUp = async (email: string, password: string) => {
  const response = await api.post('/api/auth/sign-up', { email, password });
  return response.data;
};

export const logIn = async (email: string, password: string) => {
  const response = await api.post('/api/auth/log-in', { email, password });
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
