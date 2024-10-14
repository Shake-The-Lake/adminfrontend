import React, {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import axiosInstance from './services/axiosInstance'; // Import the axios instance

type AuthContextType = {
	isAuthenticated: boolean;
	login: (username: string, password: string) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (token) {
			// Check if the token is valid
			axiosInstance
				.post('/auth/verify', {token})
				.then((response) => {
					if (response.data.valid === true) {
						setIsAuthenticated(true);
					} else {
						localStorage.removeItem('authToken');
						setIsAuthenticated(false);
					}
				})
				.catch(() => {
					localStorage.removeItem('authToken');
					setIsAuthenticated(false);
				});
		}
	}, []);

	const login = async (username: string, password: string) => {
		try {
			const response = await axiosInstance.post('/auth/login', {
				username,
				password,
			});
			const {token} = response.data;
			localStorage.setItem('authToken', token);
			setIsAuthenticated(true);
		} catch (error) {
			setIsAuthenticated(false);
		}
	};

	const logout = () => {
		localStorage.removeItem('authToken');
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{isAuthenticated, login, logout}}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};
