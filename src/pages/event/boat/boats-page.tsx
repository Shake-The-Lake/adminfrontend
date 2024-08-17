import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
	type LoaderFunctionArgs,
	useLoaderData,
	useNavigate,
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

export const loader =
	(queryClient: QueryClient) =>
		async ({params}: LoaderFunctionArgs) => {
			if (!params.id) {
				throw new Error('No event ID provided');
			}

			await queryClient.ensureQueryData(
				boatsOptions(Number(params.id), queryClient),
			);
			return {eventId: Number(params.id)};
		};

const BoatsOverview: React.FC = () => {
	const {eventId} = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;
	const {data: boats, isPending, error} = useGetBoats(eventId);

	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

	const {t} = useTranslation();
	const navigate = useNavigate();

	const handleEdit = async (id?: number) => {
		navigate(`${id}`);
	};

	const createMutation = useCreateBoat(eventId);
	const deleteMutation = useDeleteBoat(eventId);

	const openCreateDialog = () => {
		setIsCreateDialogOpen(true);
	};

	const closeCreateDialog = () => {
		setIsCreateDialogOpen(false);
	};

	return (
		<div className="flex flex-col items-center">
			<LoadingSpinner
				isLoading={
					isPending || deleteMutation.isPending || createMutation.isPending
				}
			/>
			<MutationToaster type="delete" mutation={deleteMutation} />

			<div className="w-full mb-8 flex flex-col justify-start">
				<h1>Boats</h1>
			</div>
			{boats?.length === 0 && (
				<div className="w-full py-5">
					<p className="text-lg">{t('No boats yet.')}</p>
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
								onArrowClick={handleEdit}
								deleteMutation={deleteMutation}
							/>
						</div>
					))}

				<StlDialog
					title="Create Boat"
					description="Add a new boat by entering the necessary data."
					triggerLabel="Add new boat"
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
	);
};

export default BoatsOverview;
