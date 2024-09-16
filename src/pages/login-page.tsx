import React from 'react';
import {useTranslation} from 'react-i18next';
import LoginForm from '../components/forms/login';
import {defaultLoginDto} from '../models/api/login.model';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../AuthContext';

const LoginPage: React.FC = () => {
	const location = useLocation();
	
	const from: string = location.state?.from?.pathname as string || '/';

	return (
		<>
			<div className="h-full flex flex-col justify-center items-center gap-4 text-center">
				<LoginForm
					model={defaultLoginDto}
				/>
			</div>
		</>
	);
};

export default LoginPage;
