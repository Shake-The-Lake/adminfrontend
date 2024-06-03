import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
	createActivityType,
	deleteActivityType,
	getAllActivityTypesFromEvent,
} from '../../../services/activity-type-service';
import {
	defaultActivityTypeDto,
	type ActivityTypeDto,
} from '../../../models/api/activity-type.model';
import StlCard from '../../../components/cards/stl-card';
import {getTranslation, tryGetErrorMessage} from '../../../lib/utils';
import {useNavigate, useParams} from 'react-router-dom';
import LoadingSpinner from '../../../components/animations/loading';
import StlDialog from '../../../components/dialog/stl-dialog';
import ActivityTypeForm from '../../../components/forms/activity-type';

const ActivityTypesPage = () => {
	const {id} = useParams<{id: string}>();
	const eventId = Number(id);

	const [activityTypes, setActivityTypes] = useState<ActivityTypeDto[]>([]);
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | undefined>(undefined);

	const {i18n} = useTranslation();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchActivityTypes() {
			try {
				const activityTypeData = await getAllActivityTypesFromEvent(
					Number(eventId),
				);

				setActivityTypes(activityTypeData);
			} catch (error) {
				console.error(error);
				setError('Failed to load activeTypes');
			}

			setLoading(false);
		}

		fetchActivityTypes()
			.then(() => 'obligatory for @typescript-eslint/no-floating-promises')
			.catch(() => 'obligatory for @typescript-eslint/no-floating-promises');
	}, [id]);

	if (error) return <p>{error}</p>;

	const handleEdit = (id?: number) => {
		if (id) {
			navigate(String(id));
		}
	};

	const handleDelete = async (id?: number) => {
		if (!id) {
			return false;
		}

		setLoading(true);

		try {
			await deleteActivityType(id);
			setActivityTypes((prev) => prev.filter((e) => e.id !== id));
		} catch (error) {
			console.error(error);
			setLoading(false);
			return tryGetErrorMessage(error);
		}

		setLoading(false);
		return true;
	};

	const handleCreateNewActivityType = async (dto: ActivityTypeDto) => {
		// Todo! trigger page reload after success
		setLoading(true);

		try {
			const createdType = await createActivityType(dto);
			console.log('Created activity type:', createdType);

			setActivityTypes([...activityTypes, createdType]);
		} catch (error) {
			console.error('Failed to create activity type:', error);
			setLoading(false);
			return tryGetErrorMessage(error);
		}

		setLoading(false);
		return true;
	};

	const openCreateDialog = () => {
		setIsCreateDialogOpen(true);
	};

	const closeCreateDialog = () => {
		setIsCreateDialogOpen(false);
	};

	return (
		<div className="flex flex-col items-center">
			<LoadingSpinner isLoading={loading} />

			<div className="w-full mb-8 flex flex-col justify-start">
				<h1>Activity Types</h1>
			</div>
			{activityTypes.length === 0 && (
				<div className="w-full py-5">
					<p className="text-lg">No activity types yet.</p>
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
				{activityTypes.length > 0 &&
					activityTypes.map((activityType) => (
						<div key={activityType.id} className="flex justify-center">
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

				<StlDialog
					title="Create Activity Type"
					description="Parts of this entity will eventually be displayed to the end user, therefore certain fields need to be filled out in multiple languages. Simply change the tab to edit another language."
					triggerLabel="Add new Activity Type"
					isOpen={isCreateDialogOpen}
					onClose={closeCreateDialog}
					onOpen={openCreateDialog}>
					<ActivityTypeForm
						onSubmit={handleCreateNewActivityType}
						onSuccessfullySubmitted={closeCreateDialog}
						model={defaultActivityTypeDto}
						isCreate={true}
					/>
				</StlDialog>
			</div>
		</div>
	);
};

export default ActivityTypesPage;
