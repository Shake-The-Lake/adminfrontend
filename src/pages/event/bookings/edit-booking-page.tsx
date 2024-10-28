import React from 'react';
import {useLoaderData} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useBookingDetail, useUpdateBooking} from '../../../queries/booking';
import {useUpdatePerson} from '../../../queries/person';
import PageTransitionFadeIn from '../../../components/animations/page-transition-fade-in';
import BookingForm from '../../../components/forms/booking';
import {type loader} from './booking-overview';
import {defaultBooking} from '../../../models/api/booking.model';

// Todo! needs own detail loader
const EditBookingPage: React.FC = () => {
	const {eventId, bookingId} = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;
	const {data: bookingDetails, error} = useBookingDetail(
		eventId,
		bookingId ?? 0,
	);
	const {t} = useTranslation();
	const updateBookingMutation = useUpdateBooking(eventId, bookingId ?? 0);
	const updatePersonMutation = useUpdatePerson(
		eventId,
		bookingDetails?.personId ?? 0,
	);

	return (
		<PageTransitionFadeIn>
			<h1>{t('booking.update')}</h1>

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

export default EditBookingPage;
