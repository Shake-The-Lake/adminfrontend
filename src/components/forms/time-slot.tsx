import React from 'react';
import {z} from 'zod';
import {
	type SubmitHandler,
	useForm,
	type SubmitErrorHandler,
} from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import {Input} from '../ui/input';
import {Button} from '../ui/button';
import {useParams} from 'react-router-dom';
import {zodResolver} from '@hookform/resolvers/zod';
import {useToast} from '../ui/use-toast';
import {type TimeSlotDto} from '../../models/api/time-slot.model';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import {
	getTimeStringFromWholeDate,
	getWholeDateFromTimeString,
} from '../../lib/utils';

const TimeSlotSchema = z.object({
	id: z.number().min(0).optional(),
	boatId: z.number().min(0).optional(),
	status: z.string(),
	fromTime: z.string().refine((value) => {
		const [hours, minutes] = value.split(':').map(Number);
		return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
	}, 'Invalid time format'),
	untilTime: z.string().refine((value) => {
		const [hours, minutes] = value.split(':').map(Number);
		return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
	}, 'Invalid time format'),
	// Status: z.string().oneOf(['AVAILABLE', 'ON_BREAK']),
});

export type TimeSlotFormSchema = z.infer<typeof TimeSlotSchema>;

type TimeSlotFormProps = {
	onSubmit: (dto: TimeSlotDto) => Promise<boolean | string>; // True if successfully saved, error if not
	model: TimeSlotDto;
	isCreate: boolean;
	onSuccessfullySubmitted: () => void; // Method triggers when onSubmit has run successfully (e.g. to close dialog outside)
};

const TimeSlotForm: React.FC<TimeSlotFormProps> = ({
	onSubmit,
	model,
	isCreate,
	onSuccessfullySubmitted,
}) => {
	const form = useForm<TimeSlotFormSchema>({
		mode: 'onChange',
		defaultValues: {
			...model,
			fromTime: getTimeStringFromWholeDate(model.fromTime),
			untilTime: getTimeStringFromWholeDate(model.untilTime),
		},
		resolver: zodResolver(TimeSlotSchema),
	});

	const {id} = useParams<{id: string}>();
	const boatId = Number(id);
	const {toast} = useToast();

	const onPrepareSubmit: SubmitHandler<TimeSlotFormSchema> = async (values) => {
		const timeSlot: TimeSlotDto = {
			...values,
			// Todo! probably need to pass event date here... but how?
			fromTime: getWholeDateFromTimeString(new Date(), values.fromTime),
			untilTime: getWholeDateFromTimeString(new Date(), values.untilTime),
			boatId,
			status: values.status === 'ON_BREAK' ? 'ON_BREAK' : 'AVAILABLE',
		};

		const success = await onSubmit(timeSlot);
		if (success === true) {
			onSuccessfullySubmitted();
		} else if (typeof success === 'string') {
			toast({
				variant: 'destructive',
				title: 'There was an error when saving.',
				description: success,
			});
		}
	};

	const onInvalid: SubmitErrorHandler<TimeSlotFormSchema> = (errors) => {
		console.log('form has failed to submit on error, ', errors); // Todo! add proper error handling instead, make it global

		toast({
			variant: 'destructive',
			title: 'Could not be saved.',
			description: 'There are validation errors in the form.',
		});
	};

	return (
		<>
			<Form {...form}>
				<form
					className="p-1 space-y-4 w-full"
					onSubmit={form.handleSubmit(onPrepareSubmit, onInvalid)}>
					<FormField
						name="fromTime"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>From</FormLabel>
								<FormControl>
									<Input
										placeholder="Time in HH:MM format"
										{...field}
										className="input"
										type="time"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}></FormField>
					<FormField
						name="untilTime"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>To</FormLabel>
								<FormControl>
									<Input
										placeholder="Time in HH:MM format"
										{...field}
										className="input"
										type="time"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}></FormField>
					<FormField
						name="status"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Is Bookable</FormLabel>
								<FormControl>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger>
											<SelectValue placeholder="Select Activity Type">
												{field.value === 'ON_BREAK' ? 'On Break' : 'Available'}
											</SelectValue>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="AVAILABLE">Available</SelectItem>
											<SelectItem value="ON_BREAK">On Break</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}></FormField>
					<div
						className="mt-16 flex justify-end w-full"
						style={isCreate ? {display: 'none'} : {}}>
						<Button type="submit">Save Changes</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default TimeSlotForm;
