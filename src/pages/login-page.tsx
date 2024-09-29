import React from 'react';
import LoginForm from '../components/forms/login';
import {defaultLoginDto} from '../models/api/login.model';
import HeaderLogo from '../components/header/header-logo';
import PageTransitionFadeIn from '../components/animations/page-transition-fade-in';

const LoginPage: React.FC = () => (
	<PageTransitionFadeIn>
		<HeaderLogo hasLink={false} />
		<div className="mt-10 flex flex-col items-center gap-4 content-center">
			<h1 className="text-2xl text-primary">Login</h1>
			<LoginForm model={defaultLoginDto} />
		</div>
	</PageTransitionFadeIn>
);

export default LoginPage;
