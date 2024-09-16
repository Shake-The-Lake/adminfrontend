import React from 'react';
import {useTranslation} from 'react-i18next';
import LoginForm from '../components/forms/login';
import {defaultLoginDto} from '../models/api/login.model';
import {useLoginEvent} from '../queries/login';

const LoginPage: React.FC = () => {
	const {t} = useTranslation();
	const createMutation = useLoginEvent();

	return (
		<>
			<div className="h-full flex flex-col justify-center items-center gap-4 text-center">
				<LoginForm
					mutation={createMutation}
					model={defaultLoginDto}
				/>
			</div>
		</>
	);
};

export default LoginPage;
