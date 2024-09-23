import React from 'react';
import LoginForm from '../components/forms/login';
import {defaultLoginDto} from '../models/api/login.model';
import HeaderLogo from '../components/header/header-logo';

const LoginPage: React.FC = () => (
	<>
		<HeaderLogo hasLink={false}/>
		<div className="mt-10 flex flex-col items-center gap-4 content-center">
			<h1 className="text-2xl text-primary">Login</h1>
			<LoginForm
				model={defaultLoginDto}
			/>
		</div>
	</>
);

export default LoginPage;
