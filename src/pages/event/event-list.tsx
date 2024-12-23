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

	const {data: events, error} = useGetEvents();
	const deleteMutation = useDeleteEvent();

	return (
		<div className="flex justify-center w-full max-w-lg">
			<MutationToaster type="delete" mutation={deleteMutation} />

			<div className="w-full max-w-6xl p-4">
				<div className="mb-5">
					<CreateEventDialog />
				</div>
				{error === null ? (
					<ul className="mb-5" data-testid="event-list">
						{' '}
						{events && events.length > 0 ? (
							events.map((event) => (
								<li
									key={event.id}
									className="mb-4 flex justify-center"
									data-testid={`event-card-${event.id}`}>
									<StlCard
										{...event}
										title={`${event.title} (${toSwissLocaleDateString(event.date)})`}
										link={'/event/' + event.id.toString()}
										deleteMutation={deleteMutation}
										data-testid={`event-card-${event.id}`}
									/>
									<button
										data-testid={`delete-event-button-${event.id}`}
										onClick={() => deleteMutation.mutate(event.id)}></button>
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
