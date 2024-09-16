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

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	const login = (token: string) => {
		localStorage.setItem('authToken', token);
		setIsAuthenticated(true);
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

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};
