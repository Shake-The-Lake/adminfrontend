import React from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation} from 'react-router-dom';

const BoatsOverview: React.FC = () => {
	const {t} = useTranslation();
	const location = useLocation();

	return (
		<>
			<div className="flex flex-col items-center py-24">
				<h1 className="text-2xl font-bold mb-10">{t('boats')}</h1>
				<h4>{t('welcomeMessage')}</h4>
			</div>
		</>
	);
};

export default BoatsOverview;
