"use client";

import axios, { AxiosError, AxiosRequestConfig } from "axios";

export type ApiError = {
  message: string;
  status?: number;
};

export type ApiResponse<T> = {
  data: T;
} | T;

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:4000/api";

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

let accessToken: string | null = null;
let refreshToken: string | null = null;

export const setAuthTokens = (nextAccess: string | null, nextRefresh: string | null) => {
  accessToken = nextAccess;
  refreshToken = nextRefresh;
};

export const clearAuthTokens = () => {
  accessToken = null;
  refreshToken = null;
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequest = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (status === 401 && refreshToken && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await refreshClient.post<ApiResponse<{ accessToken: string }>>(
          "/auth/refresh",
          { refreshToken },
        );
        const refreshed = unwrap(refreshResponse.data);
        accessToken = refreshed.accessToken;
        return api(originalRequest);
      } catch (refreshError) {
        clearAuthTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

const unwrap = <T,>(payload: ApiResponse<T>) => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
};

export async function apiGet<T>(url: string, config?: AxiosRequestConfig) {
  const response = await api.get<ApiResponse<T>>(url, config);
  return unwrap(response.data);
}

export async function apiPost<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) {
  const response = await api.post<ApiResponse<T>>(url, body, config);
  return unwrap(response.data);
}

export async function apiPatch<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
) {
  const response = await api.patch<ApiResponse<T>>(url, body, config);
  return unwrap(response.data);
}

export async function apiDelete<T>(url: string, config?: AxiosRequestConfig) {
  const response = await api.delete<ApiResponse<T>>(url, config);
  return unwrap(response.data);
}
