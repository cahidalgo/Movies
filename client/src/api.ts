import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000/api"
});

export function setAuthToken(token?: string) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}

// Helpers para limpiar sesión desde cualquier parte
export function clearAuth() {
  delete api.defaults.headers.common["Authorization"];
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// ⬇️ Interceptor: si el backend responde 401, limpiamos y vamos a /login
api.interceptors.response.use(
  (resp) => resp,
  (err) => {
    if (err?.response?.status === 401) {
      clearAuth();
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);
