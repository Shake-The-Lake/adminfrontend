import React, {useEffect, useState} from 'react';
import {LoaderFunctionArgs, useLoaderData, useNavigate} from 'react-router-dom';
import {FormProvider, useForm} from 'react-hook-form';
import BookingForm from '../../../components/forms/booking';
import PersonForm from '../../../components/forms/person';
import {Button} from '../../../components/ui/button';
import {useTranslation} from 'react-i18next';
import {
	CombinedBookingFormDto,
	defaultCombinedBooking,
} from '../../../models/api/booking.model';
import {useUpdatePerson} from '../../../queries/person';
import {QueryClient} from '@tanstack/react-query';
import {extractTypedInfoFromRouteParams} from '../../../lib/utils';
import {getBookingById} from '../../../services/booking-service';
import {useUpdateBooking} from '../../../queries/booking';

export const editBookingLoader =
	(queryClient: QueryClient) =>
	async ({params}: LoaderFunctionArgs) => {
		const routeIds = extractTypedInfoFromRouteParams(params);
		const {eventId, bookingId} = routeIds;

		if (!routeIds.eventId) {
			throw new Error('No event ID provided');
		}
		const bookingDetails = await queryClient.ensureQueryData({
			queryKey: ['bookingDetails', bookingId],
			queryFn: async () => getBookingById(Number(bookingId), 'person'),
		});

		if (!routeIds.bookingId) {
			throw new Error('No Booking ID provided');
		}

		return {
			eventId,
			bookingDetails,
		};
	};

const EditBookingPage = () => {
	const {eventId, bookingDetails} = useLoaderData() as Awaited<
		ReturnType<ReturnType<typeof editBookingLoader>>
	>;

	const navigate = useNavigate();
	const handleCancel = () => {
		navigate(`/event/${eventId}/bookings`);
	};
	const {t} = useTranslation();
	const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<
		number | undefined
	>(undefined);

	const updateBooking = useUpdateBooking(eventId, bookingDetails.id!);
	const updatePerson = useUpdatePerson();

	const methods = useForm({
		defaultValues: defaultCombinedBooking,
	});
	const {reset, formState} = methods;
	const {isDirty} = formState;

	useEffect(() => {
		if (bookingDetails) {
			reset({
				...defaultCombinedBooking,
				...bookingDetails,
				firstName: bookingDetails.person?.firstName ?? '',
				lastName: bookingDetails.person?.lastName ?? '',
				emailAddress: bookingDetails.person?.emailAddress ?? '',
				phoneNumber: bookingDetails.person?.phoneNumber ?? '',
				personType: bookingDetails.person?.personType ?? 'CUSTOMER',
				isRider: bookingDetails.isRider,
			});
			setSelectedTimeSlotId(bookingDetails.timeSlotId);
		}
	}, [bookingDetails, reset]);

	const onSubmit = async (data: CombinedBookingFormDto) => {
		const personUpdateData = {
			id: bookingDetails.person?.id,
			firstName: data.firstName,
			lastName: data.lastName,
			emailAddress: data.emailAddress,
			phoneNumber: data.phoneNumber,
			personType: data.personType,
		};

		const bookingUpdateData = {
			id: bookingDetails.id,
			isRider: data.isRider,
			isManual: data.isManual,
			pagerNumber: data.pagerNumber,
			personId: bookingDetails.person?.id,
			timeSlotId: data.timeSlotId,
		};

		try {
			await updatePerson.mutateAsync(personUpdateData);
			await updateBooking.mutateAsync(bookingUpdateData);

			navigate(`/event/${eventId}/bookings`);
		} catch (error) {
			console.error('Error updating booking or person:', error);
		}
	};

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
						<Button type="submit" className="ml-4" disabled={!isDirty}>
							{t('update')}
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default EditBookingPage;
