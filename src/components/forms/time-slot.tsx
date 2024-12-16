import React from 'react';
import { z } from 'zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { TimeSlotType, type TimeSlotDto } from '../../models/api/time-slot.model';
import { onInvalidFormHandler, useEmitSuccessIfSucceeded } from '../../lib/utils';
import { type BoatDto } from '../../models/api/boat.model';
import { type UseMutationResult } from '@tanstack/react-query';
import { useMutationToaster } from '../common/mutation-toaster';
import ActivityTypeSelect from '../select/activity-type-select';
import { getDisplayTimeFromBackend, validateTime } from '../../lib/date-time.utils';
import { useTranslation } from 'react-i18next';
import StlSelect from '../select/stl-select';
import { timeSlotTypeOptions } from '../../constants/constants';

const TimeSlotSchema = z.object({
	id: z.number().min(0).optional(),
	boatId: z.number().min(1).optional(),
	fromTime: z.string().refine((value) => validateTime(value), 'Invalid time'),
	untilTime: z.string().refine((value) => validateTime(value), 'Invalid time'),
	activityTypeId: z
		.number()
		.min(1)
		.or(z.string().min(1, { message: 'Required' })),
	status: z.nativeEnum(TimeSlotType),
});

export type TimeSlotFormSchema = z.infer<typeof TimeSlotSchema>;

export type TimeSlotFormProps = {
	model: TimeSlotDto;
	mutation: UseMutationResult<any, Error, TimeSlotDto>;
	isCreate: boolean;
	boat?: BoatDto;
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
		defaultValues: model,
		resolver: zodResolver(TimeSlotSchema),
	});
	const { t } = useTranslation();

	useEmitSuccessIfSucceeded(onSuccessfullySubmitted, mutation);

	useMutationToaster({ type: isCreate ? 'create' : 'update', mutation });

	const onSubmit: SubmitHandler<TimeSlotFormSchema> = async (values) => {
		const timeSlot: TimeSlotDto = {
			...model,
			...values,
			fromTime: values.fromTime,
			untilTime: values.untilTime,
			boatId: boat?.id ?? 0,
			activityTypeId:
				typeof values.activityTypeId === 'string'
					? undefined
					: values.activityTypeId,
			id: model.id,
		};

		await mutation.mutateAsync(timeSlot);
	};

	return (
		<Form {...form}>
			<form
				id="timeSlot"
				role="form"
				className="p-1 space-y-4 w-full"
				onSubmit={form.handleSubmit(onSubmit, onInvalidFormHandler)}>
				<FormField
					name="fromTime"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('from')}</FormLabel>
							<FormControl>
								<Input
									placeholder={t('timeSlot.timeFormat')}
									{...field}
									className="input"
									type="time"
									data-testid="timeSlot.fromTime"
								/>
							</FormControl>
							{model?.originalFromTime && model?.originalFromTime !== undefined && <FormDescription>
								{t('timeSlot.originalTime')}: {getDisplayTimeFromBackend(model.originalFromTime)}
							</FormDescription>}
							<FormMessage />
						</FormItem>
					)}></FormField>
				<FormField
					name="untilTime"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('to')}</FormLabel>
							<FormControl>
								<Input
									placeholder={t('timeSlot.timeFormat')}
									{...field}
									className="input"
									type="time"
									data-testid="timeSlot.untilTime"
								/>
							</FormControl>
							{model?.originalUntilTime && model?.originalUntilTime !== undefined && <FormDescription>
								{t('timeSlot.originalTime')}: {getDisplayTimeFromBackend(model.originalUntilTime)}
							</FormDescription>}
							<FormMessage />
						</FormItem>
					)}></FormField>
				<FormField
					name="activityTypeId"
					control={form.control}
					render={({ field }) => (<ActivityTypeSelect field={field} />)}></FormField>
				<FormField
					name="status"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('timeSlot.status')}</FormLabel>
							<FormControl>
								<StlSelect
									value={field.value}
									onValueChange={field.onChange}
									list={timeSlotTypeOptions(t)}
									getKey={(item) => item?.key}
									getLabel={(item) => item!.label}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default TimeSlotForm;
