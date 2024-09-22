import React from 'react';
import EventForm from '../../../components/forms/event';
import {type LoaderFunctionArgs, useLoaderData} from 'react-router-dom';
import LoadingSpinner from '../../../components/animations/loading';
import {
	eventDetailOptions,
	useEventDetail,
	useUpdateEvent,
} from '../../../queries/event';
import {type QueryClient, useQueryClient} from '@tanstack/react-query';
import {defaultEventDto} from '../../../models/api/event.model';

export const loader =
	(queryClient: QueryClient) =>
	async ({params}: LoaderFunctionArgs) => {
		if (!params.id) {
			// Const navigate = useNavigate();
			throw new Error('No event ID provided');
			// Navigate('/'); // todo! see which makes more sense
		}

		await queryClient.ensureQueryData(
			eventDetailOptions(Number(params.id), false),
		);
		return {eventId: Number(params.id)};
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
					<h1>QR Codes</h1>
					<p className="mt-2 mb-8 text-gray-600">
						Use these QR Codes to enable customers and employees to enter the
						event
					</p>
					<div className="flex flex-row mt-10">
						<div className="flex flex-col items-center mx-4">
							<p>Employee QR Code</p>
							{event?.employeeBarcode ? (
								<img
									src={`data:image/png;base64,${event?.employeeBarcode}`}
									alt="Employee QR Code"
								/>
							) : (
								<p className="italic">error while loading QR-Code...</p>
							)}
						</div>

						<div className="flex flex-col items-center mx-4">
							<p>Customer QR Code</p>
							{event?.customerBarcode ? (
								<img
									src={`data:image/png;base64,${event.customerBarcode}`}
									alt="Customer QR Code"
								/>
							) : (
								<p className="italic">error while loading QR-Code...</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventOverview;
