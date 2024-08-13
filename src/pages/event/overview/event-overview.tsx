import React from 'react';
import EventForm from '../../../components/forms/event';
import {type LoaderFunctionArgs, useLoaderData} from 'react-router-dom';
import LoadingSpinner from '../../../components/animations/loading';
import {defaultEventDto} from '../../../models/api/event.model';
import {eventDetailOptions, useUpdateEvent} from '../../../queries/events';
import {type QueryClient, useQuery} from '@tanstack/react-query';

export const loader =
	(queryClient: QueryClient) =>
		async ({params}: LoaderFunctionArgs) => {
			if (!params.id) {
			// Const navigate = useNavigate();
				throw new Error('No event ID provided');
			// Navigate('/'); // todo! see which makes more sense
			}

			await queryClient.ensureQueryData(eventDetailOptions(Number(params.id)));
			return {eventId: params.id};
		};

const EventOverview: React.FC = () => {
	const {eventId} = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;
	const {data: event, isPending} = useQuery({
		...eventDetailOptions(Number(eventId)),
		initialData: defaultEventDto,
	});

	const updateEventMutation = useUpdateEvent(Number(eventId));

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
						mutation={updateEventMutation}
						model={event}
						isCreate={false}
					/>
				</div>
				{/*
				<Separator orientation="vertical" className="h-full" />
				<div className="w-full lg:w-1/2 flex flex-col">
					<EntryValidation />
				</div>
				<div className="hidden lg:block mx-4"></div>
				*/}
			</div>
		</div>
	);
};

export default EventOverview;
