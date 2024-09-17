// axiosInstance.ts
import axios, { AxiosError, AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { baseURL } from '../../constants';
import Cookies from 'js-cookie';

interface RefreshTokenResponse {
	accessToken: string;
}
// Create an axios instance
const axiosInstance = axios.create({
	baseURL: baseURL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${Cookies.get('accessToken')}`,
	},
});

// Function to refresh token
async function refreshAccessToken(): Promise<string> {
	try {
		const response = await axios.post<RefreshTokenResponse>(`${baseURL}/v1/user/refresh-token`, {
			// Assuming the refresh token is stored in localStorage
			refreshToken: Cookies.get('refreshToken'),
		});

		const { accessToken } = response.data;
		Cookies.set('accessToken', accessToken);

		return accessToken;
	} catch (error) {
		console.error('Failed to refresh access token', error);
		throw error;
	}
}

// Request interceptor to attach access token to headers
axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		if (!config.headers) {
			config.headers = new AxiosHeaders();
		}

		const accessToken = Cookies.get('accessToken');
		if (accessToken) {
			config.headers.set('Authorization', `Bearer ${accessToken}`);
		}
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

// Response interceptor to handle 403 errors and refresh token
axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

		if (error.response && error.response.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const newAccessToken = await refreshAccessToken();
				originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
