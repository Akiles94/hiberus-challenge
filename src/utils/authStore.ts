const AUTH_TOKEN_KEY = 'tokens';
const REGISTER_TOKEN_KEY = 'register-tokens';

export const setToken = (token: string) => localStorage.setItem(AUTH_TOKEN_KEY, token);
export const setRefreshToken = (token: string) => localStorage.setItem(REGISTER_TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REGISTER_TOKEN_KEY);
export const deleteToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);
