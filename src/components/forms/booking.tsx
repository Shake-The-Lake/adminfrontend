import React, {useState} from 'react';
import {z} from 'zod';
import {
	Controller,
	FormProvider,
	type SubmitHandler,
	useForm,
} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '../ui/button';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import {Input} from '../ui/input';
import {useTranslation} from 'react-i18next';
import {type BookingDto} from '../../models/api/booking.model';
import {type UseMutationResult} from '@tanstack/react-query';
import {useMutationToaster} from '../common/mutation-toaster';
import PersonForm, {personSchema} from './person';
import StlSelect from '../select/stl-select';
import SelectableTimeSlotList from '../table/selectable-timeslot-list';
import {type PersonDto} from '../../models/api/person.model';
import {useEmitSuccessIfSucceeded} from '../../lib/utils';
import {useNavigate} from 'react-router-dom';
import {getIsRiderOptions} from '../../constants/constants';

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
	onSuccessfullySubmitted?: () => void;
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

	const {t} = useTranslation();
	const navigate = useNavigate();

	useEmitSuccessIfSucceeded(onSuccessfullySubmitted, bookingMutation);

	useMutationToaster({type: isCreate ? 'create' : 'update', mutation: bookingMutation});

	const handleCancel = () => {
		navigate(`/event/${eventId}/bookings`);
	};

	const onSubmit: SubmitHandler<BookingFormSchema> = async (values) => {
		const {person} = values;
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

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<SelectableTimeSlotList
					eventId={eventId}
					selectedTimeSlotId={selectedTimeSlotId}
					setSelectedTimeSlotId={setSelectedTimeSlotId}
				/>

				<div className="space-y-4 w-1/3 mt-20">
					<PersonForm />

					<FormItem>
						<FormLabel>{t('booking.driverOrViewer')}</FormLabel>
						<FormControl>
							<Controller
								name="isRider"
								control={form.control}
								render={({field}) => (
									<StlSelect
										value={field.value ? 'driver' : 'viewer'}
										onValueChange={(value) => {
											field.onChange(value === 'driver');
										}}
										defaultValue="viewer"
										list={getIsRiderOptions(t)}
										getKey={(item) => item?.key}
										getLabel={(item) => item!.label}
									/>
								)}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>

					<FormField
						name="pagerNumber"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>{t('pagerNumber')}</FormLabel>
								<FormControl>
									<Input placeholder={t('pagerNumber')} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
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
	);
};

export default BookingForm;
