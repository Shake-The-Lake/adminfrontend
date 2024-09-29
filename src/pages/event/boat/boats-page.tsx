import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
	type LoaderFunctionArgs,
	useLoaderData,
} from 'react-router-dom';
import {defaultBoatDto} from '../../../models/api/boat.model';
import StlCard from '../../../components/cards/stl-card';
import StlDialog from '../../../components/dialog/stl-dialog';
import BoatForm from '../../../components/forms/boat';
import LoadingSpinner from '../../../components/animations/loading';
import {type QueryClient} from '@tanstack/react-query';
import {
	boatsOptions,
	useCreateBoat,
	useDeleteBoat,
	useGetBoats,
} from '../../../queries/boat';
import {MutationToaster} from '../../../components/common/mutation-toaster';
import {extractTypedInfoFromRouteParams} from '../../../lib/utils';
import PageTransitionFadeIn from '../../../components/animations/page-transition-fade-in';

export const loader =
	(queryClient: QueryClient) =>
		async ({params}: LoaderFunctionArgs) => {
			const routeIds = extractTypedInfoFromRouteParams(params);
			if (!routeIds.eventId) {
				throw new Error('No event ID provided');
			}

			await queryClient.ensureQueryData(
				boatsOptions(routeIds.eventId, queryClient),
			);

			return routeIds;
		};

const BoatsOverview: React.FC = () => {
	const {eventId} = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;
	const {data: boats, isPending} = useGetBoats(eventId);

	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

	const {t} = useTranslation();

	const createMutation = useCreateBoat(eventId);
	const deleteMutation = useDeleteBoat(eventId);

	const openCreateDialog = () => {
		setIsCreateDialogOpen(true);
	};

	const closeCreateDialog = () => {
		setIsCreateDialogOpen(false);
	};

	return (
		<PageTransitionFadeIn>
			<div className="flex flex-col items-center">
				<LoadingSpinner isLoading={isPending} />
				<MutationToaster type="delete" mutation={deleteMutation} />

				<div className="w-full mb-8 flex flex-col justify-start">
					<h1>{t('boat.title')}</h1>
				</div>
				{boats?.length === 0 && (
					<div className="w-full py-5">
						<p className="text-lg">{t('noBoatsYet')}</p>
					</div>
				)}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
					{boats &&
						boats.length > 0 &&
						boats.map((boat) => (
							<div key={boat.id} className="flex justify-center">
								<StlCard
									id={boat.id}
									title={boat.name}
									description={`Type: ${boat.type}, Seats (Rider): ${boat.seatsRider}, Seats (Viewer): ${boat.seatsViewer}`}
									link={boat.id.toString()}
									deleteMutation={deleteMutation}
								/>
							</div>
						))}

					<StlDialog
						title={t('boat.create')}
						description={t('boat.description')}
						triggerLabel={t('boat.triggerLabel')}
						isOpen={isCreateDialogOpen}
						formId="boat"
						onClose={closeCreateDialog}
						onOpen={openCreateDialog}>
						<BoatForm
							mutation={createMutation}
							onSuccessfullySubmitted={closeCreateDialog}
							model={defaultBoatDto}
							isCreate={true}
						/>
					</StlDialog>
				</div>
			</div>
		</PageTransitionFadeIn>
	);
};

export default BoatsOverview;
