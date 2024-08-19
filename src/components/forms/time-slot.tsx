import React from 'react';
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
import {type TimeSlotDto} from '../../models/api/time-slot.model';
import {
	onInvalidFormHandler,
	useEmitSuccessIfSucceeded,
	validateTime,
} from '../../lib/utils';
import {type BoatDto} from '../../models/api/boat.model';
import {useTranslation} from 'react-i18next';
import {type UseMutationResult} from '@tanstack/react-query';
import {useGetActivityTypes} from '../../queries/activity-type';
import {MutationToaster} from '../common/mutation-toaster';
import ActivityTypeSelect from '../dropdowns/activity-type-select';

const TimeSlotSchema = z.object({
	id: z.number().min(0).optional(),
	boatId: z.number().min(0).optional(),
	fromTime: z.string().refine((value) => validateTime(value), 'Invalid time'),
	untilTime: z.string().refine((value) => validateTime(value), 'Invalid time'),
	activityTypeId: z.number().min(0).optional(),
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
			fromTime: model.fromTime,
			untilTime: model.untilTime,
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
			fromTime: values.fromTime,
			untilTime: values.untilTime,
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
						render={({field}) => <ActivityTypeSelect field={field} />}
					/>
				</form>
			</Form>
		</>
	);
};

export default TimeSlotForm;
