import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateBooking } from '../../../queries/booking';
import { useCreatePerson } from '../../../queries/person';
import { defaultBooking } from '../../../models/api/booking.model';
import PageTransitionFadeIn from '../../../components/animations/page-transition-fade-in';
import BookingForm from '../../../components/forms/booking';

const BookingPageNew: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const eventId = Number(id);
	const { t } = useTranslation();

	const createBookingMutation = useCreateBooking(eventId);
	const createPersonMutation = useCreatePerson(eventId);
	const navigate = useNavigate();

	const handleSuccessfullySubmitted = () => {
		navigate(`/event/${eventId}/bookings`);
	};

	return (
		<PageTransitionFadeIn>
			<h1>{t('booking.create')}</h1>
			<BookingForm
				model={defaultBooking}
				bookingMutation={createBookingMutation}
				personMutation={createPersonMutation}
				onSuccessfullySubmitted={handleSuccessfullySubmitted}
				isCreate={true}
				eventId={eventId}
			/>
		</PageTransitionFadeIn>
	);
};

export default BookingPageNew;
