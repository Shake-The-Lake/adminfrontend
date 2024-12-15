import React from 'react';
import { z } from 'zod';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
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
import { type EventDto } from '../../models/api/event.model';

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
	event?: EventDto;
	onSuccessfullySubmitted: () => void; // Method triggers when onSubmit has run successfully (e.g. to close dialog outside)
};

const TimeSlotForm: React.FC<TimeSlotFormProps> = ({
	model,
	mutation,
	isCreate,
	boat,
	event,
	onSuccessfullySubmitted,
}) => {
	const form = useForm<TimeSlotFormSchema>({
		mode: 'onChange',
		defaultValues: model,
		resolver: zodResolver(TimeSlotSchema),
	});

	const { t } = useTranslation();

	useEmitSuccessIfSucceeded(onSuccessfullySubmitted, mutation);

	// Todo! add comment in move dialog: • Laufende Sessions: Können verlängert oder verkürzt werden, aber nicht verschoben.
	// • Zukünftige Sessions: Können verschoben, verlängert oder verkürzt werden.Verschiebungen wirken sich auf alle darauffolgenden Sessions aus.
	// • Bereits abgeschlossene Sessions: Bleiben unverändert.Anpassungen gelten nur ab dem aktuellen Zeitpunkt(„jetzt“).
	// todo! in move dialog, handle exception: Überschneidungen sind nicht erlaubt (siehe Punkte 1 und 2). Sobald keine freien Slots mehr verfügbar sind, müssen alle verbleibenden Slots storniert werden. Die betroffenen Nutzer sollen benachrichtigt werden, dass die Fahrt nicht mehr stattfindet.

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

		// Todo! change to this: Einfach die zuletzt geloggte Zeit zusätzlich speichern. Bei einer erneuten Anpassung wird die neue Zeit als „current“ festgelegt, während die vorherige Zeit als „last time“ gespeichert bleibt. Es geht primär um die letzte eingetragen Zeit nicht um die erstel. Daher bitte so wie beschriebe umsetzen
		if (event?.date !== undefined && new Date() < event.date) {
			// During the event itself and after, we don't want to change the original time,
			// so we can trigger notifications and otherwise track the changes
			timeSlot.originalFromTime = timeSlot.fromTime;
			timeSlot.originalUntilTime = timeSlot.untilTime;
		}

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
								/>
							</FormControl>
							{model.originalFromTime && <FormDescription>
								original time: {getDisplayTimeFromBackend(model.originalFromTime)}
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
								/>
							</FormControl>
							{model.originalUntilTime && <FormDescription>
								original time: {getDisplayTimeFromBackend(model.originalUntilTime)}
							</FormDescription>}
							<FormMessage />
						</FormItem>
					)}></FormField>
				<Controller
					name="activityTypeId"
					control={form.control}
					render={({ field }) => <ActivityTypeSelect field={field} />}
				/>
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
