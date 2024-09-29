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
import {getPersonById} from '../../../services/person-service';

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
			queryFn: async () => getBookingById(Number(bookingId)),
		});
		const personDetails = await queryClient.ensureQueryData({
			queryKey: ['personDetails', bookingId],
			queryFn: async () => getPersonById(bookingDetails.personId!),
		});

		if (!routeIds.bookingId) {
			throw new Error('No Booking ID provided');
		}

		return {
			eventId,
			bookingDetails,
			personDetails,
		};
	};

const EditBookingPage = () => {
	const {eventId, bookingDetails, personDetails} = useLoaderData() as Awaited<
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

	useEffect(() => {
		if (bookingDetails) {
			setSelectedTimeSlotId(bookingDetails.timeSlotId);
		}
	}, [bookingDetails]);

	//const updateBooking = useUpdateBooking();
	const updatePerson = useUpdatePerson();
	const methods = useForm({
		defaultValues: {
			...defaultCombinedBooking,
			...bookingDetails,
			pagerNumber: bookingDetails.pagerNumber,
			firstName: personDetails.firstName,
			lastName: personDetails.lastName,
			emailAddress: personDetails.emailAddress,
			personType: personDetails.personType,
			isRider: bookingDetails?.isRider ? 'RIDER' : 'VIEWER',
		},
	});

	const onSubmit = async (data: CombinedBookingFormDto) => {
		return null;
	};

	return (
		<div>
			<h1>Edit Booking</h1>
			<FormProvider {...methods}>
				<form /*onSubmit={methods.handleSubmit(onSubmit)}*/>
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
							{t('update')}
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default EditBookingPage;
