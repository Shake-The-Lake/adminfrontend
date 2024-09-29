import React, {useEffect, useState} from 'react';
import {useLoaderData, useNavigate, useParams} from 'react-router-dom';
import {loader} from './booking-overview';
import {FormProvider, useForm} from 'react-hook-form';
import BookingForm from '../../../components/forms/booking';
import PersonForm from '../../../components/forms/person';
import {Button} from '../../../components/ui/button';
import {useTranslation} from 'react-i18next';
import {
	CombinedBookingFormDto,
	defaultCombinedBooking,
} from '../../../models/api/booking.model';
import {useGetBookingDetails, useUpdateBooking} from '../../../queries/booking';
import {useGetPersonDetails, useUpdatePerson} from '../../../queries/person';

const EditBookingPage = () => {
	const {eventId} = useLoaderData() as Awaited<
		ReturnType<ReturnType<typeof loader>>
	>;
	const {bookingId} = useParams<{bookingId: string}>();
	const navigate = useNavigate();
	const handleCancel = () => {
		navigate(`/event/${eventId}/bookings`);
	};
	const {t} = useTranslation();
	const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<
		number | undefined
	>(undefined);
	const {data: currentBooking, isLoading: bookingLoading} =
		useGetBookingDetails(Number(bookingId));
	const {data: currentPerson, isLoading: personLoading} = useGetPersonDetails(
		currentBooking?.personId ?? 0,
	);
	const updateBooking = useUpdateBooking(Number(bookingId));
	const updatePerson = useUpdatePerson();
	const methods = useForm({
		defaultValues: defaultCombinedBooking,
	});

	const onSubmit = async (dat: CombinedBookingFormDto) => {};

	useEffect(() => {
		if (currentBooking && currentPerson) {
			methods.reset({
				...currentBooking,
				firstName: currentPerson.firstName,
				lastName: currentPerson.lastName,
				emailAddress: currentPerson.emailAddress,
				phoneNumber: currentPerson.phoneNumber,
				personType: currentPerson.personType,
				isRider: currentBooking.isRider ? 'RIDER' : 'VIEWER',
			});
			setSelectedTimeSlotId(currentBooking.timeSlotId);
		}
	}, [currentBooking, currentPerson, methods]);

	if (bookingLoading || personLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<h1>Edit Booking</h1>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<div className="mt-6">
						<h3>{t('timeSlot.title')}</h3>
						<BookingForm
							control={methods.control}
							errors={methods.formState.errors}
							eventId={eventId}
							selectedTimeSlotId={selectedTimeSlotId}
							setSelectedTimeSlotId={setSelectedTimeSlotId}
						/>
					</div>
					<div>
						<PersonForm
							control={methods.control}
							errors={methods.formState.errors}
						/>
					</div>
					<div className="flex w-full justify-end mt-auto pt-4">
						<Button type="button" variant="secondary" onClick={handleCancel}>
							{t('cancel')}
						</Button>
						<Button type="submit" className="ml-4">
							{t('save')}
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default EditBookingPage;
