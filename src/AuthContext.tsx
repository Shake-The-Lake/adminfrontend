import React, {createContext, useContext, useState, useEffect, type ReactNode} from 'react';
import {uint8ArrayToBase64} from 'uint8array-extras';
// Type definition for AuthContext
type AuthContextType = {
	isAuthenticated: boolean;
	login: (username: string, password: string) => void;
	logout: () => void;
};

// Create a context for authentication
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props type for AuthProvider
type AuthProviderProps = {
	children: ReactNode;
};

// Session expiration duration: 1 week in milliseconds
const sessionDuration = 7 * 24 * 60 * 60 * 1000; // 1 week

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const encodedCredentials = localStorage.getItem('authCredentials');
		const expiration = localStorage.getItem('credentialsExpiration');

		if (encodedCredentials && expiration) {
			// Check if credentials have expired
			const now = Date.now();
			if (now > parseInt(expiration, 10)) {
				// Credentials expired, log out user
				logout();
			} else {
				// Credentials are valid
				setIsAuthenticated(true);
			}
		}
	}, []);

	const login = (username: string, password: string) => {
		// Encode username and password in Base64
		const encodedData = uint8ArrayToBase64(new TextEncoder().encode(`${username}:${password}`));
		// Store credentials in localStorage
		localStorage.setItem('authCredentials', encodedData);
		localStorage.setItem('credentialsExpiration', (Date.now() + sessionDuration).toString());
	};

	const logout = () => {
		// Remove credentials from localStorage
		localStorage.removeItem('authCredentials');
		localStorage.removeItem('credentialsExpiration');
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
