import { getToken, removeToken } from '../utils/token';

export const authFetch = async (input: RequestInfo, init: RequestInit = {}) => {
  const token = getToken();
  const headers = {
    ...init.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',
  };
  const res = await fetch(input, { ...init, headers });
  if (res.status === 401) {
    removeToken();
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  return res;
};
