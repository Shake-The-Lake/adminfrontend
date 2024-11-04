import React from 'react';
import { z } from 'zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { onInvalidFormHandler, useEmitSuccessIfSucceeded } from '../../lib/utils';
import { type BoatDto } from '../../models/api/boat.model';
import { useParams } from 'react-router-dom';
import { type UseMutationResult } from '@tanstack/react-query';
import { MutationToaster } from '../common/mutation-toaster';
import { validateTime } from '../../lib/date-time.utils';
import { useTranslation } from 'react-i18next';

const boatFormSchema = z.object({
	id: z.number().min(0).optional(),
	name: z.string().min(5),
	type: z.string(),
	seatsRider: z.coerce.number().min(0),
	seatsViewer: z.coerce.number().min(0),
	operator: z.string(),
	slotDurationInMins: z.number().optional(),
	availableFrom: z
		.string()
		.refine((value) => validateTime(value), 'Invalid time'),
	availableUntil: z
		.string()
		.refine((value) => validateTime(value), 'Invalid time'),
	eventId: z.number().optional(),
});

export type BoatFormSchema = z.infer<typeof boatFormSchema>;

type BoatFormProps = {
	model: BoatDto;
	mutation: UseMutationResult<any, Error, BoatDto>; // First any is return type, second is input
	isCreate: boolean;
	onSuccessfullySubmitted?: () => void; // Method triggers when onSubmit has run successfully (e.g. to close dialog outside)
};

const BoatForm: React.FC<BoatFormProps> = ({
	model,
	mutation,
	isCreate,
	onSuccessfullySubmitted,
}) => {
	const form = useForm<BoatFormSchema>({
		mode: 'onChange',
		defaultValues: {
			...model,
			availableFrom: model.availableFrom,
			availableUntil: model.availableUntil,
		},
		resolver: zodResolver(boatFormSchema),
	});
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();
	const eventId = Number(id);

	useEmitSuccessIfSucceeded(onSuccessfullySubmitted, mutation);

	const onSubmit: SubmitHandler<BoatFormSchema> = async (values) => {
		const boat: BoatDto = {
			...values,
			id: values.id ?? 0,
			eventId: model.eventId ?? eventId,
			timeSlotIds: model.timeSlotIds,
			availableFrom: values.availableFrom,
			availableUntil: values.availableUntil,
			activityTypeId: 0,
		};

		await mutation.mutateAsync(boat);
	};

	return (
		<>
			<MutationToaster
				type={isCreate ? 'create' : 'update'}
				mutation={mutation}
			/>
			<Form {...form}>
				<form
					id="boat"
					role="form"
					className="p-1 space-y-4 w-full"
					onSubmit={form.handleSubmit(onSubmit, onInvalidFormHandler)}>
					<FormField
						name="name"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('boat.name')}</FormLabel>
								<FormControl>
									<Input placeholder={t('boat.name')} {...field} className="input" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="type"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('boat.type')}</FormLabel>
								<FormControl>
									<Input placeholder={t('boat.type')} {...field} className="input" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="operator"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('boatDriver')}</FormLabel>
								<FormControl>
									<Input
										placeholder={t('boatDriver')}
										{...field}
										className="input"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="seatsRider"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('boat.maxSeats')}</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="0"
										{...field}
										className="input"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="seatsViewer"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('boat.maxSeatsViewers')}</FormLabel>
								<FormControl>
									<Input
										type="number"
										data-testid="maxSeatsViewers"
										placeholder="0"
										{...field}
										className="input"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="availableFrom"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('boat.availableFrom')}</FormLabel>
								<FormControl>
									<Input type="time" {...field} className="input" data-testid="availableFrom" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="availableUntil"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('boat.availableUntil')}</FormLabel>
								<FormControl>
									<Input type="time" {...field} className="input" data-testid="availableUntil" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div
						className="mt-16 flex justify-end w-full"
						style={isCreate ? { display: 'none' } : {}}>
						<Button type="submit">{t('save')}</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default BoatForm;
