import CreateEventDialog from './create-event-dialog';
import StlCard from '../../components/cards/stl-card';
import LoadingSpinner from '../../components/animations/loading';
import {useNavigate} from 'react-router-dom';
import {QueryClient, useSuspenseQuery} from '@tanstack/react-query';
import {eventsOptions, useDeleteEvent} from '../../queries/events';

export const loader = (queryClient: QueryClient) => async () =>
	await queryClient.ensureQueryData(eventsOptions());

const EventList = () => {
	const navigate = useNavigate();

	// Todo! throws warning sometimes:
	// Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components

	const {data: events, isPending, error} = useSuspenseQuery(eventsOptions());
	const deleteEventMutation = useDeleteEvent();

	// Todo! add "real" error handling. maybe use the mutation.error to handle this? make an error component that takes that as an input and displays the sonner
	const handleDelete = async (id?: number) => {
		try {
			return await deleteEventMutation.mutateAsync(id).then(() => {
				return true;
			});
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	const handleEdit = async (id?: number) => {
		navigate(`event/${id}`);
	};

	return (
		<div className="flex justify-center w-full max-w-lg">
			<LoadingSpinner isLoading={isPending} />

			<div className="w-full max-w-6xl p-4">
				<div className="mb-5">
					<CreateEventDialog />
				</div>
				{error != null ? (
					<p>{error.message}</p>
				) : (
					<ul className="mb-5">
						{events.length > 0 ? (
							events.map((event) => (
								<li key={event.id} className="mb-4 flex justify-center">
									<StlCard
										{...event}
										handleEdit={handleEdit}
										handleDelete={handleDelete}
									/>
								</li>
							))
						) : (
							<p className="text-center">No events yet.</p>
						)}
					</ul>
				)}
			</div>
		</div>
	);
};

export default EventList;
