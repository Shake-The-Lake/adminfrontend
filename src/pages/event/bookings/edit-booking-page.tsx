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
import {extractTypedInfoFromRouteParams} from '../../../lib/utils';
import {useGetBookingDetails, useUpdateBooking} from '../../../queries/booking';
import {toast} from 'sonner';
import LoadingSpinner from '../../../components/animations/loading';

export const editBookingLoader =
	() =>
	async ({params}: LoaderFunctionArgs) => {
		const routeIds = extractTypedInfoFromRouteParams(params);
		const {eventId, bookingId} = routeIds;

		if (!routeIds.eventId) {
			throw new Error('No event ID provided');
		}
		if (!routeIds.bookingId) {
			throw new Error('No Booking ID provided');
		}
		return {
			eventId,
			bookingId,
		};
	};

const EditBookingPage = () => {
	const {eventId, bookingId} = useLoaderData() as Awaited<
		ReturnType<ReturnType<typeof editBookingLoader>>
	>;
	const {
		data: bookingDetails,
		isLoading,
		refetch,
	} = useGetBookingDetails(bookingId!);
	const navigate = useNavigate();
	const {t} = useTranslation();
	const updateBooking = useUpdateBooking(eventId, bookingId!);
	const updatePerson = useUpdatePerson();
	const methods = useForm({
		defaultValues: defaultCombinedBooking,
	});
	const {reset, formState} = methods;
	const {isDirty} = formState;
	const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<
		number | undefined
	>(bookingDetails?.timeSlotId);

	const handleCancel = () => {
		navigate(`/event/${eventId}/bookings`);
	};

	useEffect(() => {
		if (bookingDetails) {
			const combinedBookingFieldValues = {
				...bookingDetails,
				...bookingDetails.person,
			};
			reset(combinedBookingFieldValues);
			setSelectedTimeSlotId(bookingDetails.timeSlotId);
		}
	}, [bookingDetails, reset]);

	const onSubmit = async (data: CombinedBookingFormDto) => {
		const personUpdateData = {
			id: bookingDetails?.person?.id,
			firstName: data.firstName,
			lastName: data.lastName,
			emailAddress: data.emailAddress,
			phoneNumber: data.phoneNumber,
			personType: data.personType,
		};
		const bookingUpdateData = {
			id: bookingDetails?.id,
			isRider: data.isRider,
			isManual: data.isManual,
			pagerNumber: data.pagerNumber,
			personId: bookingDetails?.person?.id,
			timeSlotId: selectedTimeSlotId,
		};

		try {
			await updatePerson.mutateAsync(personUpdateData);
			await updateBooking.mutateAsync(bookingUpdateData);
			await refetch();

			navigate(`/event/${eventId}/bookings`);
		} catch (error) {
			toast.error(t('booking.updateFailed'), {
				description: t('booking.updateFailed'),
			});
			console.error('Error updating booking or person:', error);
		}
	};

	return (
		<div>
			<h1>Edit Booking</h1>
			<LoadingSpinner isLoading={isLoading} />
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
						<Button type="submit" className="ml-4" /*disabled={!isDirty}*/>
							{t('update')}
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default EditBookingPage;
