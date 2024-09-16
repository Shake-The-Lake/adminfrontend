import React from 'react';
import EventForm from '../../../components/forms/event';
import {type LoaderFunctionArgs, useLoaderData} from 'react-router-dom';
import LoadingSpinner from '../../../components/animations/loading';
import {
	eventDetailOptions,
	useEventDetail,
	useUpdateEvent,
} from '../../../queries/event';
import {useQueryClient, type QueryClient} from '@tanstack/react-query';
import {defaultEventDto} from '../../../models/api/event.model';
import {extractTypedInfoFromRouteParams} from '../../../lib/utils';

export const loader =
	(queryClient: QueryClient) =>
		async ({params}: LoaderFunctionArgs) => {
			const routeIds = extractTypedInfoFromRouteParams(params);
			if (!routeIds.eventId) {
			// Const navigate = useNavigate();
				throw new Error('No event ID provided');
			// Navigate('/'); // todo! see which makes more sense
			}

			await queryClient.ensureQueryData(
				eventDetailOptions(routeIds.eventId, false),
			);

			return routeIds;
		};

const EventOverview: React.FC = () => {
	const queryClient = useQueryClient();
	const {eventId} = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;
	const {data: event, isPending} = useEventDetail(queryClient, eventId, false);

	const updateMutation = useUpdateEvent(eventId);

	return (
		<div className="flex flex-col items-start justify-between max-h-fit w-full">
			<LoadingSpinner isLoading={isPending} />

			<div className="w-full flex flex-col lg:flex-row">
				<div className="w-full my-2">
					<h1>Basic Data</h1>
					<p className="mt-2 mb-8 text-gray-600">
						Enter the basic data for the event
					</p>
					<EventForm
						mutation={updateMutation}
						model={event ?? defaultEventDto}
						isCreate={false}
					/>
				</div>
			</div>
		</div>
	);
};

export default EventOverview;
