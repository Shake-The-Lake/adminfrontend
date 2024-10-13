import React from 'react';
import {useTranslation} from 'react-i18next';
import {useLoaderData} from 'react-router-dom';
import {useCreateBooking} from '../../../queries/booking';
import {useCreatePerson} from '../../../queries/person';
import {defaultBooking} from '../../../models/api/booking.model';
import PageTransitionFadeIn from '../../../components/animations/page-transition-fade-in';
import BookingForm from '../../../components/forms/booking';
import {loader} from './booking-overview';

const AddBookingPage: React.FC = () => {
	const {eventId} = useLoaderData() as Awaited<
		ReturnType<ReturnType<typeof loader>>
	>;
	const {t} = useTranslation();

	const createBookingMutation = useCreateBooking(eventId);
	const createPersonMutation = useCreatePerson();

	return (
		<PageTransitionFadeIn>
			<h1>{t('booking.create')}</h1>
			<BookingForm
				model={defaultBooking}
				bookingMutation={createBookingMutation}
				personMutation={createPersonMutation}
				isCreate={true}
				eventId={eventId}
			/>
		</PageTransitionFadeIn>
	);
};

export default AddBookingPage;
