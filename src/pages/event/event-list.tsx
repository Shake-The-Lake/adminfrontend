import React from 'react';
import CreateEventDialog from './create-event-dialog';
import StlCard from '../../components/cards/stl-card';
import {type QueryClient} from '@tanstack/react-query';
import {eventsOptions, useDeleteEvent, useGetEvents} from '../../queries/event';
import {MutationToaster} from '../../components/common/mutation-toaster';
import {useTranslation} from 'react-i18next';
import {toSwissLocaleDateString} from '../../lib/date-time.utils';

export const loader = (queryClient: QueryClient) => async () =>
	queryClient.ensureQueryData(eventsOptions());

const EventList: React.FC = () => {
	const {t} = useTranslation();
	// Todo! throws warning sometimes:
	// Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components

	const {data: events, error} = useGetEvents();
	const deleteMutation = useDeleteEvent();

	// Todo! add "real" error handling. maybe use the mutation.error to handle this? make an error component that takes that as an input and displays the sonner. important! not per default on card, because then it would get triggered for each

	return (
		<div className="flex justify-center w-full max-w-lg">
			<MutationToaster type="delete" mutation={deleteMutation} />

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
										title={`${event.title} (${toSwissLocaleDateString(event.date)})`}
										link={'/event/' + event.id.toString()}
										deleteMutation={deleteMutation}
									/>
								</li>
							))
						) : (
							<p className="text-center">{t('eventOverview.noEventsYet')}</p>
						)}
					</ul>
				) : (
					<p>Failed to load events!</p>
				)}
			</div>
		</div>
	);
};

export default EventList;
