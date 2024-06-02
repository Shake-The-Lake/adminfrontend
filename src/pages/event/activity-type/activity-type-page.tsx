import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ActivityTypeForm from '../../../components/forms/activity-type';
import {type ActivityTypeDto} from '../../../models/api/activity-type.model';
import {updateActivityType} from '../../../services/activity-type-service';
import {useLoaderData} from 'react-router-dom';
import LoadingSpinner from '../../../components/animations/loading';
import {useToast} from '../../../components/ui/use-toast';

const ActivityTypePage: React.FC = () => {
	const [activityType, setActivityType] = useState<ActivityTypeDto | undefined>(
		undefined,
	);
	const [isLoading, setIsLoading] = useState(true);
	const routeData = useLoaderData();
	const {toast} = useToast();

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
			const updatedActivityType = await updateActivityType(
				activityType?.id ?? 0,
				dto,
			);
			console.log('Updated activity type:', updatedActivityType);
		} catch (error) {
			console.error('Failed to update activity type:', error);
			toast({
				variant: 'destructive',
				description: 'Activity Type could not be saved.',
			});
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
						onSuccessfullySubmitted={() => {
							toast({
								description: 'Activity Type successfully saved.',
							});
						}}
						model={activityType}
						isCreate={false}
					/>
				)}
			</div>
		</>
	);
};

export default ActivityTypePage;
