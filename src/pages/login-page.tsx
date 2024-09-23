import React from 'react';
import {useTranslation} from 'react-i18next';
import LoginForm from '../components/forms/login';
import {defaultLoginDto} from '../models/api/login.model';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../AuthContext';
import HeaderLogo from '../components/header/header-logo';

const LoginPage: React.FC = () => {
	const location = useLocation();
	
	const from: string = location.state?.from?.pathname as string || '/';

	return (
		<>
			<HeaderLogo />
			<div className="mt-10 flex flex-col items-center gap-4 content-center">
				<h1 className="text-2xl text-primary">Login</h1>
				<LoginForm
					model={defaultLoginDto}
				/>
			</div>
		</>
	);
};

export default LoginPage;
