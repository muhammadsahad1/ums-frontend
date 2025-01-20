// axiosSetup.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getTokens } from './tokenManagement';
import { refreshToken } from '@/api/user';

// Create axios instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true
});

// here setup of request interceptors
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const tokens = getTokens();
        if (tokens?.access_token) {
            config.headers.auth = tokens.access_token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export const setupAxiosInterceptors = (handleAuthError: (error: any) => void) => {

    // Add new interceptor
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {

            const originalRequest = error.config;
            if (!originalRequest) return Promise.reject(error);
            if (error.response?.status === 401 && !(originalRequest as any)._retry) {
                try {

                    (originalRequest as any)._retry = true;
                    const newAccessToken = await refreshToken();
                    originalRequest.headers.auth = newAccessToken;

                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    handleAuthError(refreshError);
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
};

export default axiosInstance;