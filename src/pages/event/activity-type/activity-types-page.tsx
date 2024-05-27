import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {deleteActivityType, getAllActivityTypes} from '../../../services/activity-type-serivce';
import {type ActivityTypeDto} from '../../../models/api/activity-type.model';
import StlCard from '../../../components/cards/card';
import CreateActivityTypeDialog from './create-activity-type-dialog';
import {getTranslation} from '../../../lib/utils';
import {Button} from '../../../components/ui/button';
import {Plus} from 'lucide-react';

const ActivityTypesPage = () => {
	const [activityTypes, setActivityType] = useState<ActivityTypeDto[]>([]);
	const [activeActivityType, setActiveActivityType] = useState<ActivityTypeDto | undefined>(undefined);
	  const [isActivityTypeDialogOpen, setIsActivityTypeDialogOpen] = useState(false);

	const openActivityTypeDialog = () => {
		setIsActivityTypeDialogOpen(true); 
	};

	const closeActivityTypeDialog = () => {
		setIsActivityTypeDialogOpen(false); 
	};

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

	const handleEdit = async (id?: number) => {
		const currentActiveType = activityTypes.find((activityType) => activityType.id === id);
		setActiveActivityType(currentActiveType);
		openActivityTypeDialog();
	};

	const handleDelete = async (id?: number) => {
		try {
			await deleteActivityType(id);
			return true;
		} catch (error) {
			console.error(error); // Todo! add "real" error handling
			return false;
		}
	};

	return (
		<div className="flex justify-center w-full">
			<div className="w-full max-w-6xl p-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
					{activityTypes.length > 0 ? (
						activityTypes.map((activityType) => (
							<div key={activityType.id} className="mb-4 flex justify-center">
								<StlCard
									id={activityType.id}
									title={getTranslation(i18n.language, activityType.name)}
									description={getTranslation(i18n.language, activityType.description)}
									handleEdit={handleEdit}
									handleDelete={handleDelete}
								/>
							</div>
						))
					) : (
						<p className="text-center">No activity types yet.</p>
					)}

					<Button className="h-40 w-full flex items-center justify-center" onClick={() => {
						openActivityTypeDialog();
					}}>
						<Plus className="size-24" />
					</Button>
				</div>
				
				<CreateActivityTypeDialog 
					setActivityType={getAllActivityTypes} 
					currentActivityType={activeActivityType} 
					isActivityTypeDialogOpen={isActivityTypeDialogOpen} 
					closeActivityTypeDialog={closeActivityTypeDialog} 
					openActivityTypeDialog={open}
				/>
				
			</div>
		</div>
	);
};

export default ActivityTypesPage;
