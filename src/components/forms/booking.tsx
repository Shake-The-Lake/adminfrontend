import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import {
	Controller,
	FormProvider,
	type SubmitHandler,
	useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useTranslation } from 'react-i18next';
import { type BookingDto } from '../../models/api/booking.model';
import { type UseMutationResult } from '@tanstack/react-query';
import { useMutationToaster } from '../common/mutation-toaster';
import PersonForm, { personSchema } from './person';
import StlSelect from '../select/stl-select';
import SelectableTimeSlotList from '../table/selectable-timeslot-list';
import { type PersonDto } from '../../models/api/person.model';
import { useEmitSuccessIfSucceededWithParameter } from '../../lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIsRiderOptions } from '../../constants/constants';
import { useDeleteBooking } from '../../queries/booking';

const bookingSchema = z.object({
	id: z.number().optional(),
	isRider: z.boolean(),
	isManual: z.boolean(),
	pagerNumber: z.coerce.number(),
	person: personSchema,
	timeSlotId: z.number().optional(),
});

export type BookingFormSchema = z.infer<typeof bookingSchema>;

type BookingFormProps = {
	model: BookingDto;
	bookingMutation: UseMutationResult<BookingDto, Error, BookingDto>;
	personMutation: UseMutationResult<PersonDto, Error, PersonDto>;
	isCreate: boolean;
	onSuccessfullySubmitted?: (id: number) => void;
	eventId: number;
};

const BookingForm: React.FC<BookingFormProps> = ({
	model,
	bookingMutation,
	personMutation,
	isCreate,
	onSuccessfullySubmitted,
	eventId,
}) => {
	const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<
		number | undefined
	>(model.timeSlotId);

	const form = useForm<BookingFormSchema>({
		mode: 'onChange',
		defaultValues: model,
		resolver: zodResolver(bookingSchema),
	});

	const { t } = useTranslation();
	const navigate = useNavigate();

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { state } = useLocation();

	useEffect(() => {
		if (state !== undefined && state !== null) {
			setSelectedTimeSlotId(Number(state.timeSlotId));
		}
	}, [state]);

	useEmitSuccessIfSucceededWithParameter(onSuccessfullySubmitted, bookingMutation);

	useMutationToaster({ type: isCreate ? 'create' : 'update', mutation: bookingMutation });

	const handleCancel = () => {
		// With react-router-dom this triggers a browser-back.
		// This way we can handle having the add button on multiple different pages.
		navigate(-1);
	};

	const onSubmit: SubmitHandler<BookingFormSchema> = async (values) => {
		const { person } = values;
		const savedPerson = await personMutation.mutateAsync(person);

		const isManual = isCreate ? true : model.isManual;

		const booking: BookingDto = {
			...values,
			id: values.id ?? model.id,
			timeSlotId: selectedTimeSlotId ?? model.timeSlotId,
			personId: savedPerson.id,
			isManual,
		};

		await bookingMutation.mutateAsync(booking);
	};

	const deleteMutation = useDeleteBooking(eventId);
	const handleDelete = async () => {
		if (!isCreate) {
			navigate(-1); // We assume delete will succeed (cannot be after as otherwise we would get stuck in a loop due to invalidation)
			await deleteMutation.mutateAsync(model?.id ?? 0);
		}
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<SelectableTimeSlotList
					eventId={eventId}
					selectedTimeSlotId={selectedTimeSlotId}
					setSelectedTimeSlotId={setSelectedTimeSlotId}
				/>

				<div className="space-y-4 mt-20">
					<PersonForm />

					<FormItem>
						<FormLabel>{t('booking.driverOrViewer')}</FormLabel>
						<FormControl>
							<Controller
								name="isRider"
								control={form.control}
								render={({ field }) => (
									<StlSelect
										data-testid="booking-is-rider"
										value={field.value ? 'rider' : 'viewer'}
										onValueChange={(value?: string) => {
											field.onChange(value !== 'viewer');
										}}
										defaultValue="rider"
										list={getIsRiderOptions(t)}
										getKey={(item) => item?.key}
										getLabel={(item) => item!.label}
										dataTestId="driverOrViewerDropdown"
									/>
								)}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>

					<FormField
						name="pagerNumber"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('pagerNumber')}</FormLabel>
								<FormControl>
									<Input
										placeholder={t('pagerNumber')}
										{...field}
										data-testid="booking-pager-number"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex w-full justify-between items-end mt-auto pt-4">
					{!isCreate && (<Button
						type="button"
						variant="destructiveOutline"
						onClick={handleDelete}
						title={t('delete')}>
						{t('delete')}
					</Button>)}

					<div className="flex w-full justify-end mt-auto pt-4">
						<Button type="button" variant="secondary" onClick={handleCancel}>
							{t('cancel')}
						</Button>
						<Button
							type="submit"
							className="ml-4"
							data-testid="booking-submit-button">
							{t('save')}
						</Button>
					</div>
				</div>
			</form>
		</FormProvider>
	);
};

export default BookingForm;
