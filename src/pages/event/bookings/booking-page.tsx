import React from 'react';
import { type LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
	bookingDetailOptions,
	useBookingDetail,
	useUpdateBooking,
} from '../../../queries/booking';
import { useUpdatePerson } from '../../../queries/person';
import PageTransitionFadeIn from '../../../components/animations/page-transition-fade-in';
import BookingForm from '../../../components/forms/booking';
import { defaultBooking } from '../../../models/api/booking.model';
import { type QueryClient } from '@tanstack/react-query';
import { extractTypedInfoFromRouteParams, type RouteParamsLoaderData } from '../../../lib/utils';
import AuditTrailInfo from '../../../components/common/audit-trail-info';

export const loader =
	(queryClient: QueryClient) =>
		async ({ params }: LoaderFunctionArgs) => {
			const routeIds = extractTypedInfoFromRouteParams(params);
			if (!routeIds.eventId) {
				throw new Error('No event ID provided');
			}

			if (!routeIds.bookingId) {
				throw new Error('No booking ID provided');
			}

			await queryClient.ensureQueryData(
				bookingDetailOptions(routeIds.eventId, routeIds.bookingId),
			);

			return routeIds;
		};

const BookingPage: React.FC = () => {
	const { eventId, bookingId } = useLoaderData() as RouteParamsLoaderData;
	const { data: bookingDetails, error } = useBookingDetail(eventId, bookingId);

	const { t } = useTranslation();

	const updateBookingMutation = useUpdateBooking(eventId, bookingId);
	const updatePersonMutation = useUpdatePerson(
		eventId,
		bookingDetails?.personId ?? 0,
	);

	return (
		<PageTransitionFadeIn>
			<h1 className='mb-5'>{t('booking.update')}</h1>

			<AuditTrailInfo {...bookingDetails} />

			{error && <p>{t('booking.errorLoadingBooking')}</p>}
			{bookingDetails && (
				<BookingForm
					model={bookingDetails ?? defaultBooking}
					bookingMutation={updateBookingMutation}
					personMutation={updatePersonMutation}
					isCreate={false}
					eventId={eventId}
				/>
			)}
		</PageTransitionFadeIn>
	);
};

export default BookingPage;
