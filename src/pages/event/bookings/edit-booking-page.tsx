import React from 'react';
import {useLoaderData} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useGetBookingDetails, useUpdateBooking} from '../../../queries/booking';
import {useUpdatePerson} from '../../../queries/person';
import {defaultBooking} from '../../../models/api/booking.model';
import PageTransitionFadeIn from '../../../components/animations/page-transition-fade-in';
import LoadingSpinner from '../../../components/animations/loading';
import BookingForm from '../../../components/forms/booking';
import {loader} from './booking-overview';

const EditBookingPage: React.FC = () => {
	const {eventId, bookingId} = useLoaderData() as Awaited<
		ReturnType<ReturnType<typeof loader>>
	>;
	const {data: bookingDetails, isLoading} = useGetBookingDetails(bookingId!);
	const {t} = useTranslation();

	const updateBookingMutation = useUpdateBooking(eventId, bookingId!);
	const updatePersonMutation = useUpdatePerson();

	return (
		<PageTransitionFadeIn>
			<h1>{t('booking.update')}</h1>
			<LoadingSpinner isLoading={isLoading} />
			<BookingForm
				model={bookingDetails ?? defaultBooking}
				bookingMutation={updateBookingMutation}
				personMutation={updatePersonMutation}
				isCreate={false}
				eventId={eventId}
			/>
		</PageTransitionFadeIn>
	);
};

export default EditBookingPage;
