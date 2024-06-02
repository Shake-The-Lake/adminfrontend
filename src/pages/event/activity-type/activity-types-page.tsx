import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
	createActivityType,
	deleteActivityType,
	getAllActivityTypes,
} from '../../../services/activity-type-serivce';
import {type ActivityTypeDto} from '../../../models/api/activity-type.model';
import StlCard from '../../../components/cards/stl-card';
import {getTranslation} from '../../../lib/utils';
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

	const handleEdit = (id?: number) => {
		if (id) {
			navigate(String(id));
		}
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

	const handleCreateNewActivityType = async (dto: ActivityTypeDto) => {
		// Todo! trigger page reload after success
		try {
			const createdType = await createActivityType(dto);
			console.log('Created activity type:', createdType);
		} catch (error) {
			console.error('Failed to create activity type:', error);
			return false;
		}

		return true;
	};

	const closeCreateDialog = () => {
		setIsCreateDialogOpen(false);
	};

	const openCreateDialog = () => {
		setIsCreateDialogOpen(true);
	};

	return (
		<div className="flex flex-col items-center">
			<LoadingSpinner isLoading={loading} />

			<div className="w-full my-2 flex flex-col justify-start">
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
						model={{
							id: undefined,
							name: undefined,
							description: undefined,
							checklist: undefined,
							icon: undefined,
							eventId: undefined,
						}}
						isCreate={true}
					/>
				</StlDialog>
			</div>
		</div>
	);
};

export default ActivityTypesPage;
