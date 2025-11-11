import { createContext, useContext, useEffect, useState } from "react";
import { setAuthToken, api, clearAuth } from "../api";

type User = { id: number; name: string; email: string };
type AuthCtx = {
  user?: User;
  token?: string;
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx>(null as any);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setAuthToken(t);

    // Validar el token con el backend
    (async () => {
      try {
        if (t) {
          const { data } = await api.get("/auth/me");
          setUser(data.user);
          setToken(t);
        } else {
          clearAuth();
        }
      } catch {
        // Token inválido/expirado/clave cambiada → limpiar sesión
        clearAuth();
        setUser(undefined);
        setToken(undefined);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  async function login(email: string, password: string) {
    const { data } = await api.post("/auth/login", { email, password });
    setAuth(data);
  }
  async function register(name: string, email: string, password: string) {
    const { data } = await api.post("/auth/register", { name, email, password });
    setAuth(data);
  }
  function setAuth(data: any) {
    setToken(data.token); setUser(data.user);
    setAuthToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  function logout() {
    clearAuth();
    setUser(undefined);
    setToken(undefined);
  }

  return <Ctx.Provider value={{ user, token, ready, login, register, logout }}>{children}</Ctx.Provider>;
}
