import React, {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { auth } from './config/firebaseConfig';
import {
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';

type AuthContextType = {
	isAuthenticated: boolean;
	login: (username: string, password: string) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setIsAuthenticated(true);
			} else {
				localStorage.removeItem('authToken');
				setIsAuthenticated(false);
			}
		});
	}, []);

	const login = async (username: string, password: string) => {
		try {
			const authUser = await signInWithEmailAndPassword(auth, username, password);
			localStorage.setItem('authToken', await authUser.user.getIdToken());
			setIsAuthenticated(true);
		} catch (error) {
			console.error('Login failed', error);
			setIsAuthenticated(false);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			localStorage.removeItem('authToken');
			setIsAuthenticated(false);
		} catch (error) {
			console.error('Logout failed', error);
		}
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
