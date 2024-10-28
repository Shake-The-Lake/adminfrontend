import axios, {type AxiosError} from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
	// eslint-disable-next-line @typescript-eslint/naming-convention
	baseURL: import.meta.env.VITE_APP_BASE_URL as string,
	timeout: 10000,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('authToken');

		// If a token exists, add it to the Authorization header
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
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

			localStorage.removeItem('authToken'); // Remove the JWT token

			window.location.href = '/login';
		}

		throw error;
	},
);

export default axiosInstance;
