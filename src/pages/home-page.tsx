import React from 'react';
import EventList from './event/event-list';
import {useTranslation} from 'react-i18next';

const HomePage: React.FC = () => {
	const {t} = useTranslation();

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-2xl font-bold mb-10">{t('appName')}</h1>
			<h4>{t('welcomeMessage')}</h4>

			<EventList />
		</div>
	);
};

export default HomePage;
