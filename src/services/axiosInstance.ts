import axios, { type AxiosError } from 'axios';
import { auth } from '../config/firebaseConfig';
import { getIdToken } from 'firebase/auth';

// Create an Axios instance
const axiosInstance = axios.create({
	// eslint-disable-next-line @typescript-eslint/naming-convention
	baseURL: import.meta.env.VITE_APP_BASE_URL as string,
	timeout: 10000,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
	async (config) => {
		const user = auth.currentUser;
		if (user) {
			const token = await getIdToken(user);
			config.headers.Authorization = `Bearer ${token}`;
		}
		else {
			const currentLocation = window.location.pathname;
			localStorage.setItem('redirectAfterLogin', currentLocation);
			window.location.href = '/login';
			throw new Error('User is not authenticated');
		}
		return config;
	},
	async (error: AxiosError) => {
		throw error;
	},
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		// Check if the error response status is 401 (Unauthorized)
		if (error.response && (error.response.status === 401 || error.response.status === 403)) {
			const currentLocation = window.location.pathname;
			localStorage.setItem('redirectAfterLogin', currentLocation);
			window.location.href = '/login';
		}

		throw error;
	},
);

export default axiosInstance;
