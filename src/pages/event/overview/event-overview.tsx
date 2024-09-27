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
import {extractTypedInfoFromRouteParams} from '../../../lib/utils';
import { useTranslation } from 'react-i18next';

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
	const {t} = useTranslation();
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
					<h1>{t('eventOverview.basicData')}</h1>
					<p className="mt-2 mb-8 text-gray-600">
						{t('eventOverview.enter')}
					</p>
					<EventForm
						mutation={updateMutation}
						model={event ?? defaultEventDto}
						isCreate={false}
					/>
					<div className="mt-8">
						<h1>{t('eventOverview.qrCodes')}</h1>
						<p className="mt-2 mb-8 text-gray-600">
							{t('eventOverview.useQrCodes')}
						</p>
						<div className="flex flex-row mt-2">
							<div className="flex flex-col items-center mx-4">
								<p>{t('eventOverview.employeeQrCode')}</p>
								{event?.employeeBarcode ? (
									<img
										src={`data:image/png;base64,${event?.employeeBarcode}`}
										alt="Employee QR Code"
									/>
								) : (
									<p className="italic">{t('eventOverview.errorLoading')}</p>
								)}
							</div>

							<div className="flex flex-col items-center mx-4">
								<p>{t('eventOverview.customerQrCode')}</p>
								{event?.customerBarcode ? (
									<img
										src={`data:image/png;base64,${event.customerBarcode}`}
										alt="Customer QR Code"
									/>
								) : (
									<p className="italic">{t('eventOverview.errorLoading')}</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventOverview;
