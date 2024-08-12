import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation} from 'react-router-dom';
import {type BoatDto} from '../../../models/api/boat.model';

const SchedulePage: React.FC = () => {
	const {t} = useTranslation();
	const location = useLocation();

	const [boats, setBoats] = useState<BoatDto[]>([]);
	console.log('boats', boats);
	const [loading, setLoading] = useState(true);

	return (
		<>
			<div className="flex flex-col items-center py-24">
				<h1 className="text-2xl font-bold mb-10">{t('schedule')}</h1>
				<h4>hiiii</h4>
			</div>
		</>
	);
};

export default SchedulePage;
