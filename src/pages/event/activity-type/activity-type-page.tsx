import React from 'react';
import {useTranslation} from 'react-i18next';

const ActivityTypePage: React.FC = () => {
	const {t} = useTranslation();

	return (
		<>
			<div className="flex flex-col items-center py-24">
				<h1 className="text-2xl font-bold mb-10">{t('activityType')}</h1>
				<h4>{t('welcomeMessage')}</h4>
			</div>
		</>
	);
};

export default ActivityTypePage;
