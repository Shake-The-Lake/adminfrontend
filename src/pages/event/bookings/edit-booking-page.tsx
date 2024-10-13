import React from 'react';
import {useLoaderData} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useGetBookingDetails, useUpdateBooking} from '../../../queries/booking';
import {useUpdatePerson} from '../../../queries/person';
import PageTransitionFadeIn from '../../../components/animations/page-transition-fade-in';
import LoadingSpinner from '../../../components/animations/loading';
import BookingForm from '../../../components/forms/booking';
import {loader} from './booking-overview';
import {defaultBooking} from '../../../models/api/booking.model';

const EditBookingPage: React.FC = () => {
	const {eventId, bookingId} = useLoaderData() as Awaited<
		ReturnType<ReturnType<typeof loader>>
	>;
	const {data: bookingDetails, isLoading} = useGetBookingDetails(bookingId!);
	const {t} = useTranslation();

	const updateBookingMutation = useUpdateBooking(eventId, bookingId!);
	const updatePersonMutation = useUpdatePerson();

	if (isLoading) {
		return <LoadingSpinner isLoading={true} />;
	}

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
