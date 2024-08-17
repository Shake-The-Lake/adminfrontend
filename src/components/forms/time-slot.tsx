import React, {useEffect, useState} from 'react';
import {z} from 'zod';
import {type SubmitHandler, useForm, Controller} from 'react-hook-form';
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
	onInvalidFormHandler,
	useEmitSuccessIfSucceeded,
} from '../../lib/utils';
import {type BoatDto} from '../../models/api/boat.model';
import {getAllActivityTypesFromEvent} from '../../services/activity-type-service';
import {type ActivityTypeDto} from '../../models/api/activity-type.model';
import {useTranslation} from 'react-i18next';
import {type UseMutationResult} from '@tanstack/react-query';
import {useGetActivityTypes} from '../../queries/activity-type';
import {MutationToaster} from '../common/mutation-toaster';

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
	model: TimeSlotDto;
	mutation: UseMutationResult<any, Error, TimeSlotDto>; // First any is return type, second is input
	isCreate: boolean;
	boat?: BoatDto;
	// Status: string; // todo!still necessary?
	onSuccessfullySubmitted: () => void; // Method triggers when onSubmit has run successfully (e.g. to close dialog outside)
};

const TimeSlotForm: React.FC<TimeSlotFormProps> = ({
	model,
	mutation,
	isCreate,
	boat,
	onSuccessfullySubmitted,
}) => {
	const form = useForm<TimeSlotFormSchema>({
		mode: 'onChange',
		defaultValues: {
			...model,
			fromTime: getTimeStringFromWholeDate(model.fromTime),
			untilTime: getTimeStringFromWholeDate(model.untilTime),
			activityTypeId: model.activityTypeId ?? 0,
		},
		resolver: zodResolver(TimeSlotSchema),
	});

	const {id} = useParams<{id: string}>();
	const eventId = Number(id);
	const {i18n} = useTranslation();

	const {data: activityTypes} = useGetActivityTypes(eventId);

	useEmitSuccessIfSucceeded(onSuccessfullySubmitted, mutation);

	const onSubmit: SubmitHandler<TimeSlotFormSchema> = async (values) => {
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

		await mutation.mutateAsync(timeSlot);
	};

	return (
		<>
			<MutationToaster
				type={isCreate ? 'create' : 'update'}
				mutation={mutation}
			/>
			<Form {...form}>
				<form
					id="timeSlot"
					className="p-1 space-y-4 w-full"
					onSubmit={form.handleSubmit(onSubmit, onInvalidFormHandler)}>
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
														activityTypes?.find(
															(type) => type.id === field.value,
														)?.name,
													)
													: 'Select Activity Type'}
											</SelectValue>
										</SelectTrigger>
										<SelectContent>
											{activityTypes?.map((type) => (
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
