import React, {createContext, useContext, useState, useEffect, type ReactNode} from 'react';

type AuthContextType = {
	isAuthenticated: boolean;
	login: (token: string) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
	children: ReactNode;
};

// Set the session to expire after 1 week (in milliseconds)
const sessionDuration = 7 * 24 * 60 * 60 * 1000; // 1 week

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		const expiration = localStorage.getItem('tokenExpiration');

		if (token && expiration) {
			// Check if the token is expired
			const now = Date.now();
			if (now > parseInt(expiration, 10)) {
				// Token expired, remove token and logout user
				logout();
			} else {
				// Token is valid
				setIsAuthenticated(true);
			}
		}
	}, []);

	const login = (token: string) => {
		// Calculate the expiration time (current time + 1 week)
		const expirationTime = Date.now() + sessionDuration;

		// Store the token and its expiration time in localStorage
		localStorage.setItem('authToken', token);
		localStorage.setItem('tokenExpiration', expirationTime.toString());
		setIsAuthenticated(true);
	};

	const logout = () => {
		localStorage.removeItem('authToken');
		localStorage.removeItem('tokenExpiration');
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{isAuthenticated, login, logout}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};
