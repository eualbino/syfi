import { refreshToken } from "@/data/AuthUser/auth-user";
import { env } from "@/env";
import axios from "axios";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 404 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken();
      const authToken = localStorage.getItem("authToken");
      api.defaults.headers.common.Authorization = `Bearer ${authToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
