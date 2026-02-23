import { useState, useEffect, useCallback } from "react";
import { authApi } from "@/lib/api";

interface AuthUser {
  id: number;
  email: string;
  is_admin: boolean;
}

const TOKEN_KEY = "alamdar_token";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    authApi
      .me()
      .then(setUser)
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { access_token } = await authApi.login(email, password);
    localStorage.setItem(TOKEN_KEY, access_token);
    const me = await authApi.me();
    setUser(me);
    return me;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  return { user, loading, login, logout, isAuthenticated: !!user };
}