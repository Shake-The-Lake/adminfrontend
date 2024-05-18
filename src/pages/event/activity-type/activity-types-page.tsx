import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {deleteActivityType, getAllActivityTypes} from '../../../services/activity-type-serivce';
import {type ActivityTypeDto} from '../../../models/api/activity-type.model';
import StlCard from '../../../components/cards/card';
import CreateActivityTypeDialog from './create-activity-type-dialog';
import {getTranslation} from '../../../lib/utils';

const ActivityTypesPage = () => {
	const [activityTypes, setActivityType] = useState<ActivityTypeDto[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | undefined>(undefined);

	const {i18n} = useTranslation();

	useEffect(() => {
		async function fetchActivityTypes() {
			try {
				const activityTypeData = await getAllActivityTypes();
				setActivityType(activityTypeData);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching events:', error);
				setError('Failed to load events');
				setLoading(false);
			}
		}

		fetchActivityTypes()
			.then(() => 'obligatory for @typescript-eslint/no-floating-promises')
			.catch(() => 'obligatory for @typescript-eslint/no-floating-promises');
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	const handleDelete = async (id: number) => {
		try {
			await deleteActivityType(id);
			return true;
		} catch (error) {
			console.error(error); // Todo! add "real" error handling
			return false;
		}
	};

	return (
		<div className="flex justify-center w-full max-w-lg">
			<div className="w-full max-w-6xl p-4">
				<ul>
					{activityTypes.length > 0 ? (
						activityTypes.map((activityType) => (
							<li key={activityType.id} className="mb-4 flex justify-center">
								<StlCard
									id={activityType.id}
									title={getTranslation(i18n.language, activityType.name)}
									description={getTranslation(i18n.language, activityType.description)}
									path={`event/${activityType.id}`}
									handleDelete={handleDelete}
								/>
							</li>
						))
					) : (
						<p className="text-center">No activity types yet.</p>
					)}
				</ul>
				<CreateActivityTypeDialog />
			</div>
		</div>
	);
};

export default ActivityTypesPage;
