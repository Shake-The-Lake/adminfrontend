import React from 'react';
import CreateEventDialog from './create-event-dialog';
import StlCard from '../../components/cards/stl-card';
import LoadingSpinner from '../../components/animations/loading';
import {useNavigate} from 'react-router-dom';
import {type QueryClient, useQuery} from '@tanstack/react-query';
import {eventsOptions, useDeleteEvent} from '../../queries/events';
import {MutationToaster} from '../../components/common/mutation-toaster';

export const loader = (queryClient: QueryClient) => async () =>
	queryClient.ensureQueryData(eventsOptions());

const EventList = () => {
	const navigate = useNavigate();

	// Todo! throws warning sometimes:
	// Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components

	// todo! error, when navigating back by browser button.. need replace suspense?
	// console.js:273 React Router caught the following error during render Error: A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.
	const {data: events, isPending, error} = useQuery(eventsOptions());
	const deleteEventMutation = useDeleteEvent();

	// Todo! add "real" error handling. maybe use the mutation.error to handle this? make an error component that takes that as an input and displays the sonner. important! not per default on card, because then it would get triggered for each

	const handleEdit = async (id?: number) => {
		navigate(`event/${id}`);
	};

	return (
		<div className="flex justify-center w-full max-w-lg">
			<LoadingSpinner isLoading={isPending} />
			<MutationToaster type="delete" mutation={deleteEventMutation} />

			<div className="w-full max-w-6xl p-4">
				<div className="mb-5">
					<CreateEventDialog />
				</div>
				{error === null ? (
					<ul className="mb-5">
						{events && events.length > 0 ? (
							events.map((event) => (
								<li key={event.id} className="mb-4 flex justify-center">
									<StlCard
										{...event}
										onArrowClick={handleEdit}
										deleteMutation={deleteEventMutation}
									/>
								</li>
							))
						) : (
							<p className="text-center">No events yet.</p>
						)}
					</ul>
				) : (
					<p>{error.message}</p>
				)}
			</div>
		</div>
	);
};

export default EventList;
