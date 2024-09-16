import React from 'react';
import {useTranslation} from 'react-i18next';

const ScheduleItemPage: React.FC = () => {
	const {t} = useTranslation();

	return (
		<>
			<div className="flex flex-col items-center py-24">
				<h1 className="text-2xl font-bold mb-10">Schedule</h1>
				<h4>{t('welcomeMessage')}</h4>
			</div>
		</>
	);
};

export default ScheduleItemPage;
