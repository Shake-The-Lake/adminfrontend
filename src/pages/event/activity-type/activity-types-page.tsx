import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
	deleteActivityType,
	getAllActivityTypes,
} from '../../../services/activity-type-serivce';
import {type ActivityTypeDto} from '../../../models/api/activity-type.model';
import StlCard from '../../../components/cards/stl-card';
import CreateActivityTypeDialog from './create-activity-type-dialog';
import {getTranslation} from '../../../lib/utils';
import {useParams} from 'react-router-dom';
import {Button} from '../../../components/ui/button';
import {Plus} from 'lucide-react';
import LoadingSpinner from '../../../components/animations/loading';

const ActivityTypesPage = () => {
	const {id} = useParams<{id: string}>();
	const eventId = Number(id);

	const [activityTypes, setActivityTypes] = useState<ActivityTypeDto[]>([]);
	const [activeActivityType, setActiveActivityType] = useState<
	ActivityTypeDto | undefined
	>(undefined);
	const [isActivityTypeDialogOpen, setIsActivityTypeDialogOpen] =
		useState(false);

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
				const activityTypeData = await getAllActivityTypes(Number(eventId));
				setActivityTypes(activityTypeData);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setError('Failed to load activeTypes');
				setLoading(false);
			}
		}

		fetchActivityTypes()
			.then(() => 'obligatory for @typescript-eslint/no-floating-promises')
			.catch(() => 'obligatory for @typescript-eslint/no-floating-promises');
	}, [id]);

	if (error) return <p>{error}</p>;

	const handleEdit = async (id?: number) => {
		const currentActiveType = activityTypes.find(
			(activityType) => activityType.id === id,
		);
		setActiveActivityType(currentActiveType);
		openActivityTypeDialog();
	};

	const handleDelete = async (id?: number) => {
		if (!id) {
			return false;
		}

		try {
			await deleteActivityType(id);
			return true;
		} catch (error) {
			console.error(error); // Todo! add "real" error handling
			return false;
		}
	};

	return (
		<div className="flex flex-col items-center py-10 px-10">
			<LoadingSpinner isLoading={loading} />

			<div className="w-full my-5 flex flex-col justify-start">
				<h2>Activity Types</h2>
			</div>
			{activityTypes.length === 0 && (
				<div className="w-full py-5">
					<p className="text-lg">No activity types yet.</p>
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
				{activityTypes.length > 0 &&
					activityTypes.map((activityType) => (
						<div key={activityType.id} className="mb-4 flex justify-center">
							<StlCard
								id={activityType.id}
								title={getTranslation(i18n.language, activityType.name)}
								description={getTranslation(
									i18n.language,
									activityType.description,
								)}
								handleEdit={handleEdit}
								handleDelete={handleDelete}
							/>
						</div>
					))}

				<Button
					className="h-40 w-full flex items-center justify-center"
					onClick={() => {
						openActivityTypeDialog();
					}}>
					<Plus className="size-24" />
				</Button>
			</div>

			<CreateActivityTypeDialog
				setActivityType={setActivityTypes}
				currentActivityType={activeActivityType}
				isActivityTypeDialogOpen={isActivityTypeDialogOpen}
				closeActivityTypeDialog={closeActivityTypeDialog}
				openActivityTypeDialog={open}
			/>
		</div>
	);
};

export default ActivityTypesPage;
