import React from 'react';
import {z} from 'zod';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import {zodResolver} from '@hookform/resolvers/zod';
import {type UseMutationResult} from '@tanstack/react-query';
import {MutationToaster} from '../common/mutation-toaster';
import {BookingDto} from '../../models/api/booking.model';
import {Input} from '../ui/input';

const BookingSchema = z.object({
	id: z.number().min(0).optional(),
	pagerNumber: z.number(),
	isRider: z.boolean(),
	isManual: z.boolean(),
	timeSlotId: z.number(),
});

export type BookingFormSchema = z.infer<typeof BookingSchema>;

type BookingFormProps = {
	model: BookingDto;
	mutation: UseMutationResult<any, Error, BookingDto>;
	isCreate: boolean;
};

const BookingForm: React.FC<BookingFormProps> = ({
	model,
	mutation,
	isCreate,
}) => {
	const form = useForm<BookingFormSchema>({
		mode: 'onChange',
		defaultValues: {
			id: model.id ?? 0,
			pagerNumber: 0,
			isRider: model.isRider ?? false,
			isManual: model.isManual ?? false,
			timeSlotId: model.timeSlotId ?? 0,
		},
		resolver: zodResolver(BookingSchema),
	});

	const onSubmit: SubmitHandler<BookingFormSchema> = async (values) => {
		const booking: BookingDto = {
			...values,
			personId: 0,
			id: values.id ?? model.id,
		};

		await mutation.mutateAsync(booking);
	};

	return (
		<>
			<MutationToaster
				type={isCreate ? 'create' : 'update'}
				mutation={mutation}
			/>
			<Form {...form}>
				<form
					id="bookingForm"
					className="p-1 space-y-4 w-full"
					onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						name="pagerNumber"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Pager Number</FormLabel>
								<FormControl>
									<Input placeholder="XC23832" {...field} className="input" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="isRider"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Participant Type</FormLabel>
								<FormControl>
									<Input placeholder="XC23832" {...field} className="input" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</>
	);
};

export default BookingForm;
