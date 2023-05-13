const TOKEN_KEY = 'token';

export const saveTokenToLS = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getTokenFromLS = () => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const clearTokenFromLS = () => {
  localStorage.removeItem(TOKEN_KEY);
};
