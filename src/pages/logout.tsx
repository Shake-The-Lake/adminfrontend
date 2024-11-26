
import React from 'react';
import { useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';

const LogoutPage: React.FC = () => {
	const { logout } = useAuth();

	useEffect(() => {
		localStorage.setItem('redirectAfterLogin', '');
		logout();
	}, []);

	return <Navigate to={'/login'} replace />;

};

export default LogoutPage;
