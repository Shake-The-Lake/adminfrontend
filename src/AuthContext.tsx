import React, {createContext, useContext, useState, useEffect, type ReactNode} from 'react';
import {Buffer} from 'buffer'; // Importing Buffer for base64 encoding

type AuthContextType = {
	isAuthenticated: boolean;
	login: (username: string, password: string) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
	children: ReactNode;
};

// Session expiration duration: 1 week in milliseconds
const sessionDuration = 7 * 24 * 60 * 60 * 1000; // 1 week

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

	const encodeBase64 = (data: string) => Buffer.from(data).toString('base64');

	const login = (username: string, password: string) => {
		// Encode username and password in Base64
		const encodedData = encodeBase64(`${username}:${password}`); 
		// Store credentials in localStorage
		localStorage.setItem('authCredentials', encodedData);
		localStorage.setItem('credentialsExpiration', (Date.now() + sessionDuration).toString());
		setIsAuthenticated(true); // Update the authentication status
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
