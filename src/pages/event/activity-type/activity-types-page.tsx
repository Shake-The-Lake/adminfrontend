import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {defaultActivityTypeDto} from '../../../models/api/activity-type.model';
import StlCard from '../../../components/cards/stl-card';
import {
	extractTypedInfoFromRouteParams,
	getTranslation,
} from '../../../lib/utils';
import {
	type LoaderFunctionArgs,
	useLoaderData,
	useNavigate,
} from 'react-router-dom';
import LoadingSpinner from '../../../components/animations/loading';
import StlDialog from '../../../components/dialog/stl-dialog';
import ActivityTypeForm from '../../../components/forms/activity-type';
import {type QueryClient} from '@tanstack/react-query';
import {
	activityTypesOptions,
	useCreateActivityType,
	useDeleteActivityType,
	useGetActivityTypes,
} from '../../../queries/activity-type';
import {MutationToaster} from '../../../components/common/mutation-toaster';

export const loader =
	(queryClient: QueryClient) =>
		async ({params}: LoaderFunctionArgs) => {
			const routeIds = extractTypedInfoFromRouteParams(params);
			if (!routeIds.eventId) {
				throw new Error('No event ID provided');
			}

			await queryClient.ensureQueryData(
				activityTypesOptions(routeIds.eventId, queryClient),
			);
			return routeIds;
		};

const ActivityTypesPage = () => {
	const {eventId} = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;
	const {data: activityTypes, isPending, error} = useGetActivityTypes(eventId);

	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

	const {i18n} = useTranslation();
	const navigate = useNavigate();

	const handleEdit = (id?: number) => {
		if (id) {
			navigate(String(id));
		}
	};

	const createMutation = useCreateActivityType(eventId);
	const deleteMutation = useDeleteActivityType(eventId);

	const openCreateDialog = () => {
		setIsCreateDialogOpen(true);
	};

	const closeCreateDialog = () => {
		setIsCreateDialogOpen(false);
	};

	return (
		<div className="flex flex-col items-center">
			<LoadingSpinner isLoading={isPending} />
			<MutationToaster type="delete" mutation={deleteMutation} />

			<div className="w-full mb-8 flex flex-col justify-start">
				<h1>Activity Types</h1>
			</div>
			{activityTypes?.length === 0 && (
				<div className="w-full py-5">
					<p className="text-lg">No activity types yet.</p>
				</div>
			)}
			{error && <p>Failed to load ActivityTypes!</p>}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
				{activityTypes &&
					activityTypes.length > 0 &&
					activityTypes.map((activityType) => (
						<div key={activityType.id} className="flex justify-center">
							<StlCard
								id={activityType.id}
								title={getTranslation(i18n.language, activityType.name)}
								description={getTranslation(
									i18n.language,
									activityType.description,
								)}
								onArrowClick={handleEdit}
								deleteMutation={deleteMutation}
							/>
						</div>
					))}

				<StlDialog
					title="Create Activity Type"
					description="Parts of this entity will eventually be displayed to the end user, therefore certain fields need to be filled out in multiple languages. Simply change the tab to edit another language."
					triggerLabel="Add new Activity Type"
					isOpen={isCreateDialogOpen}
					onClose={closeCreateDialog}
					onOpen={openCreateDialog}
					formId="activityType">
					<ActivityTypeForm
						mutation={createMutation}
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
