import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getToken, setToken, removeToken } from '../utils/storage';
import client from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    client
      .get(ENDPOINTS.auth.userInfo)
      .then(({ data }) => setUser(data))
      .catch(() => {
        removeToken();
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (token, userData) => {
    setToken(token);
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    try {
      await client.get(ENDPOINTS.auth.logout);
    } catch {
      // ignore
    } finally {
      removeToken();
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
