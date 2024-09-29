import React from 'react';
import {useLoaderData, useNavigate} from 'react-router-dom';
import {loader} from './booking-overview';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {defaultCombinedBooking} from '../../../models/api/booking.model';

const EditBookingPage = () => {
	const {eventId} = useLoaderData() as Awaited<
		ReturnType<ReturnType<typeof loader>>
	>;
	const navigate = useNavigate();
	const handleCancel = () => {
		navigate(`/event/${eventId}/bookings`);
	};
	const {t} = useTranslation();
	const methods = useForm({
		defaultValues: defaultCombinedBooking,
	});

	return (
		<div>
			{/*			<h1>Create New Booking</h1>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit()}>
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
			</FormProvider>*/}
		</div>
	);
};

export default EditBookingPage;
