import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ActivityTypeForm from '../../../components/forms/activity-type';
import {type ActivityTypeDto} from '../../../models/api/activity-type.model';
import {updateActivityType} from '../../../services/activity-type-serivce';
import {useLoaderData} from 'react-router-dom';
import LoadingSpinner from '../../../components/animations/loading';

const ActivityTypePage: React.FC = () => {
	const [activityType, setActivityType] = useState<ActivityTypeDto | undefined>(
		undefined,
	);
	const [isLoading, setIsLoading] = useState(true);
	const routeData = useLoaderData();

	useEffect(() => {
		setIsLoading(true);
		if (routeData) {
			setActivityType(routeData as ActivityTypeDto);
			setIsLoading(false);
		} else {
			console.error('Error fetching activity type');
		}
	}, [routeData]);

	const {t} = useTranslation();

	const handleUpdateActivityType = async (dto: ActivityTypeDto) => {
		try {
			const createdType = await updateActivityType(activityType?.id ?? 0, dto);
			console.log('Created type:', createdType);
		} catch (error) {
			console.error('Failed to create type:', error);
			return false;
		}

		return true;
	};

	return (
		<>
			<div className="flex flex-col items-center">
				<LoadingSpinner isLoading={isLoading} />

				<h1 className="text-2xl font-bold mb-10">{t('activityType')}</h1>
				{activityType && (
					<ActivityTypeForm
						key={activityType.id}
						onSubmit={handleUpdateActivityType}
						model={activityType}
					/>
				)}
			</div>
		</>
	);
};

export default ActivityTypePage;
