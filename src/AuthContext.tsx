import React, {createContext, useContext, useState, useEffect, type ReactNode} from 'react';

// Utility to manage cookies
const setCookie = (name: string, value: string, days: number, path = '/') => {
	const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
	document.cookie = `${name}=${value}; expires=${expires}; path=${path}; Secure; SameSite=Strict`;
};

const getCookie = (name: string): string => {
	const matches = new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1')}=([^;]*)`).exec(document.cookie);
	return matches ? decodeURIComponent(matches[1]) : '';
};

const deleteCookie = (name: string, path = '/') => {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; Secure; SameSite=Strict`;
};

type AuthContextType = {
	isAuthenticated: boolean;
	login: (token: string) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
	children: ReactNode;
};

// Set the session to expire after 1 week (in days)
const SESSION_DURATION_DAYS = 7;

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const token = getCookie('authToken');
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	const login = (token: string) => {
		// Set the token in the cookie with a 1-week expiration
		setCookie('authToken', token, SESSION_DURATION_DAYS);
		setIsAuthenticated(true);
	};

	const logout = () => {
		// Remove the token from the cookie
		deleteCookie('authToken');
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
