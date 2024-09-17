import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from './AuthContext';
import EventDetailLayout from './components/event-detail-layout';

type ProtectedRouteProps = {
	redirectPath?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({redirectPath = '/login'}) => {
	const {isAuthenticated} = useAuth();

	if (!isAuthenticated) {
		return <Navigate to={redirectPath} replace />;
	}

	return <EventDetailLayout />; // Renders child routes if authenticated
};

export default ProtectedRoute;
