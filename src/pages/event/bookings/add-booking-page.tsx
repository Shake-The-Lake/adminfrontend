import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button} from '../../../components/ui/button';
import {useLoaderData, useNavigate} from 'react-router-dom';
import PersonForm from '../../../components/forms/person';
import BookingForm from '../../../components/forms/booking';
import {useCreatePerson} from '../../../queries/person';
import {useCreateBooking} from '../../../queries/booking';
import {loader} from './booking-overview';
import {useTranslation} from 'react-i18next';
import {defaultCombinedBooking} from '../../../models/api/booking.model';

const AddBookingPage: React.FC = () => {
	const {eventId} = useLoaderData() as Awaited<
		ReturnType<ReturnType<typeof loader>>
	>;
	const navigate = useNavigate();
	const {t} = useTranslation();
	const createPersonMutation = useCreatePerson();
	const createBookingMutation = useCreateBooking(eventId);
	const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<
		number | undefined
	>(undefined);
	const handleCancel = () => {
		navigate(`/event/${eventId}/bookings`);
	};
	const methods = useForm({
		defaultValues: defaultCombinedBooking,
	});

	const onSubmit = async (data: any) => {
		try {
			const personData = {
				firstName: data.firstName,
				lastName: data.lastName,
				emailAddress: data.emailAddress,
				phoneNumber: data.phoneNumber,
				personType: data.personType,
			};
			const newPerson = await createPersonMutation.mutateAsync(personData);

			const bookingData = {
				isRider: data.isRider,
				isManual: true,
				pagerNumber: data.pagerNumber || 0,
				personId: newPerson.id,
				timeSlotId: selectedTimeSlotId!,
			};
			await createBookingMutation.mutateAsync(bookingData);
			navigate(`/event/${eventId}/bookings`);
		} catch (error) {
			alert('Error creating booking');
		}
	};

	return (
		<div>
			<h1> {t('booking.create')}</h1>
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
					<div className="mt-10 w-1/3">
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

export default AddBookingPage;
