import React, {useEffect, useState} from 'react';
import {z} from 'zod';
import {
	type SubmitHandler,
	useForm,
	type SubmitErrorHandler,
	Controller,
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
	getTranslation,
	getWholeDateFromTimeString,
} from '../../lib/utils';
import {type BoatDto} from '../../models/api/boat.model';
import {getAllActivityTypesFromEvent} from '../../services/activity-type-service';
import {type ActivityTypeDto} from '../../models/api/activity-type.model';
import {useTranslation} from 'react-i18next';

const TimeSlotSchema = z.object({
	id: z.number().min(0).optional(),
	boatId: z.number().min(0).optional(),
	fromTime: z.string().refine((value) => {
		const [hours, minutes] = value.split(':').map(Number);
		return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
	}, 'Invalid time'),
	untilTime: z.string().refine((value) => {
		const [hours, minutes] = value.split(':').map(Number);
		return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
	}),
	activityTypeId: z.number(),
});

export type TimeSlotFormSchema = z.infer<typeof TimeSlotSchema>;

type TimeSlotFormProps = {
	onSubmit: (dto: TimeSlotDto) => Promise<boolean | string>; // True if successfully saved, error if not
	model: TimeSlotDto;
	isCreate: boolean;
	boat?: BoatDto;
	status: string;
	onSuccessfullySubmitted: () => void; // Method triggers when onSubmit has run successfully (e.g. to close dialog outside)
};

const TimeSlotForm: React.FC<TimeSlotFormProps> = ({
	onSubmit,
	model,
	isCreate,
	onSuccessfullySubmitted,
	boat,
}) => {
	const form = useForm<TimeSlotFormSchema>({
		mode: 'onChange',
		defaultValues: {
			...model,
			fromTime: getTimeStringFromWholeDate(model.fromTime),
			untilTime: getTimeStringFromWholeDate(model.untilTime),
			activityTypeId: 0,
		},
		resolver: zodResolver(TimeSlotSchema),
	});
	const {toast} = useToast();
	const {id} = useParams<{id: string}>();
	const eventId = Number(id);
	const {i18n} = useTranslation();
	const [activityTypes, setActivityTypes] = useState<ActivityTypeDto[]>([]);

	useEffect(() => {
		const fetchActivityTypes = async () => {
			try {
				const response = await getAllActivityTypesFromEvent(eventId);
				setActivityTypes(response);
			} catch (error) {
				console.error('Failed to fetch activity types:', error);
			}
		};

		fetchActivityTypes()
			.then(() => 'obligatory for @typescript-eslint/no-floating-promises')
			.catch(() => 'obligatory for @typescript-eslint/no-floating-promises');
	}, [eventId]);

	const onPrepareSubmit: SubmitHandler<TimeSlotFormSchema> = async (values) => {
		const timeSlot: TimeSlotDto = {
			...values,
			fromTime: getWholeDateFromTimeString(
				new Date(boat?.availableFrom ?? new Date()),
				values.fromTime,
			),
			untilTime: getWholeDateFromTimeString(
				new Date(boat?.availableFrom ?? new Date()),
				values.untilTime,
			),
			boatId: boat?.id ?? 0,
			id: model.id,
			status: 'AVAILABLE',
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
					<Controller
						name="activityTypeId"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Activity Type</FormLabel>
								<FormControl>
									<Select
										value={field.value ? field.value.toString() : ''}
										onValueChange={(value) => {
											field.onChange(Number(value));
										}}>
										<SelectTrigger>
											<SelectValue placeholder="Select Activity Type">
												{field.value
													? getTranslation(
														i18n.language,
														activityTypes.find(
															(type) => type.id === field.value,
														)?.name,
													)
													: 'Select Activity Type'}
											</SelectValue>
										</SelectTrigger>
										<SelectContent>
											{activityTypes.map((type) => (
												<SelectItem key={type.id} value={type.id.toString()}>
													{getTranslation(i18n.language, type.name)}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
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

export default TimeSlotForm;
