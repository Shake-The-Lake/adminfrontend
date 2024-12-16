import React from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeaderLogo from './header-logo';

const HeaderDefault: React.FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<header className="flex h-14 items-center gap-4 border-b pr-4 lg:h-[var(--header-height)] lg:pr-6 backdrop-blur sticky top-0 z-10">
			<HeaderLogo />
			<div className="w-full flex-1"></div>
			<Button
				variant="link"
				className="heading-s-upper text-primary"
				onClick={() => {
					navigate('/');
				}}>
				{t('events')}
			</Button>
			<Button
				variant="link"
				className="heading-s-upper text-primary"
				onClick={() => {
					navigate('/logout');
				}}>
				{t('logout')}
			</Button>
		</header>
	);
};

export default HeaderDefault;
