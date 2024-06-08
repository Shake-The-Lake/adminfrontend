import React, {useEffect, useState} from 'react';
import {z} from 'zod';
import {
	Controller,
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
import {getAllActivityTypesFromEvent} from '../../services/activity-type-service';
import {type ActivityTypeDto} from '../../models/api/activity-type.model';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '../ui/button';
import {useTranslation} from 'react-i18next';
import {getTranslation} from '../../lib/utils';
import {type BoatDto} from '../../models/api/boat.model';
import {useParams} from 'react-router-dom';
import {useToast} from '../ui/use-toast';

const boatFormSchema = z.object({
	id: z.number().min(0).optional(),
	name: z.string().min(5),
	type: z.string(),
	seatsRider: z.coerce.number().min(0),
	seatsViewer: z.coerce.number().min(0),
	operator: z.string(),
	slotDurationInMins: z.number().optional(),
	availableFrom: z.string().refine((val) => !isNaN(Date.parse(val)), {
		message: 'Invalid date format',
	}),
	availableUntil: z.string().refine((val) => !isNaN(Date.parse(val)), {
		message: 'Invalid date format',
	}),
	activityTypeId: z.number().optional(),
	eventId: z.number().optional(),
	// Timeslots are not yet part of the form
	// timeSlots: z
	// 	.instanceof(Set<TimeSlotDto>)
	// 	.optional()
	// 	.or(z.undefined()),
	// timeSlotIds: z
	// 	.instanceof(Set<number>)
	// 	.optional()
	// 	.or(z.undefined()),
});

export type BoatFormSchema = z.infer<typeof boatFormSchema>;

type BoatFormProps = {
	onSubmit: (dto: BoatDto) => Promise<boolean | string>; // True if successfully saved, error if not
	model: BoatDto;
	isCreate: boolean;
	onSuccessfullySubmitted: () => void; // Method triggers when onSubmit has run successfully (e.g. to close dialog outside)
};

const BoatForm: React.FC<BoatFormProps> = ({
	model,
	onSubmit,
	isCreate,
	onSuccessfullySubmitted,
}) => {
	const form = useForm<BoatFormSchema>({
		mode: 'onChange',
		defaultValues: model,
		resolver: zodResolver(boatFormSchema),
	});

	const {i18n} = useTranslation();
	const {id} = useParams<{id: string}>();
	const eventId = Number(id);
	const {toast} = useToast();

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
	}, []);

	const onPrepareSubmit: SubmitHandler<BoatFormSchema> = async (values) => {
		const boat: BoatDto = {
			...values,
			id: values.id ?? 0,
			eventId: model.eventId ?? eventId,
			timeSlotIds: model.timeSlotIds,
		};

		const success = await onSubmit(boat);
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

	const onInvalid: SubmitErrorHandler<BoatFormSchema> = (errors) => {
		console.log('form has failed to submit on error, ', errors); // Todo! add proper error handling instead

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
						name="name"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Boat Name</FormLabel>
								<FormControl>
									<Input placeholder="Boat Name" {...field} className="input" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="type"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Boat Type</FormLabel>
								<FormControl>
									<Input placeholder="Boat Type" {...field} className="input" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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

					<FormField
						name="operator"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Boat Driver</FormLabel>
								<FormControl>
									<Input
										placeholder="Boat Driver"
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
						render={({field}) => (
							<FormItem>
								<FormLabel>Max available seats for riders</FormLabel>
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
						render={({field}) => (
							<FormItem>
								<FormLabel>Max available seats for viewers</FormLabel>
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
						name="availableFrom"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Boat Available From</FormLabel>
								<FormControl>
									<Input type="datetime-local" {...field} className="input" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="availableUntil"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Boat Available Until</FormLabel>
								<FormControl>
									<Input type="datetime-local" {...field} className="input" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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

export default BoatForm;
