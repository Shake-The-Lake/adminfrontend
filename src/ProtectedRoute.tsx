import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from './AuthContext';

type ProtectedRouteProps = {
	redirectPath?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({redirectPath = '/login'}) => {
	const {isAuthenticated} = useAuth();

	if (!isAuthenticated) {
		return <Navigate to={redirectPath} replace />;
	}

	return <Outlet />; // Renders child routes if authenticated
};

export default ProtectedRoute;
