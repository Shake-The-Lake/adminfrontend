import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCreateBooking } from '../../../queries/booking';
import { useCreatePerson } from '../../../queries/person';
import { defaultBooking } from '../../../models/api/booking.model';
import PageTransitionFadeIn from '../../../components/animations/page-transition-fade-in';
import BookingForm from '../../../components/forms/booking';
import { bookingsRoute } from '../../../constants';

const BookingPageNew: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const eventId = Number(id);
	const { t } = useTranslation();

	const createBookingMutation = useCreateBooking(eventId);
	const createPersonMutation = useCreatePerson(eventId);
	const navigate = useNavigate();

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { state } = useLocation();

	const handleSuccessfullySubmitted = (id: number) => {

		if (state !== undefined && state !== null && typeof state.timeSlotId === 'number') {
			// With react-router-dom this triggers a browser-back.
			// This way we can handle having the add button on multiple different pages.
			navigate(-1);
		} else {
			// Navigate to detail page if created from overview route
			navigate(`${bookingsRoute(eventId)}/edit/${id}`, { replace: true });
		}
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
