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
import {useTranslation} from 'react-i18next';
import {useToast} from '../ui/use-toast';
import {type TimeSlotDto} from '../../models/api/time-slot.model';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '../ui/select';

const TimeSlotSchema = z.object({
	from: z.string(),
	to: z.string(),
	// Status: z.string().oneOf(['AVAILABLE', 'ON_BREAK']),
	status: z.string(),
});

export type TimeSlotFormSchema = z.infer<typeof TimeSlotSchema>;

type TimeSlotFormProps = {
	onSubmit: (dto: TimeSlotDto) => Promise<boolean | string>; // True if successfully saved, error if not
	// model: TimeSlotDto;
	isCreate: boolean;
	onSuccessfullySubmitted: () => void; // Method triggers when onSubmit has run successfully (e.g. to close dialog outside)
};

const TimeSlotForm: React.FC<TimeSlotFormProps> = ({
	onSubmit,
	isCreate,
	onSuccessfullySubmitted,
}) => {
	const form = useForm<TimeSlotFormSchema>({
		mode: 'onChange',
		// DefaultValues: model,
		resolver: zodResolver(TimeSlotSchema),
	});
	
	const {id} = useParams<{id: string}>();
	const boatId = Number(id);
	const {toast} = useToast();

	const onPrepareSubmit: SubmitHandler<TimeSlotFormSchema> = async (
		values,
	) => {
		const TimeSlot: TimeSlotDto = {
			fromTime: values.from ?? '',
			untilTime: values.to ?? '',
			boatId,
		};

		const success = await onSubmit(TimeSlot);
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
						name="from"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>From</FormLabel>
								<FormControl>
									<Input
										placeholder="Time in HH:MM format"
										{...field}
										className="input"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}></FormField>
					<FormField
						name="to"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>To</FormLabel>
								<FormControl>
									<Input
										placeholder="Time in HH:MM format"
										{...field}
										className="input"
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
									<Select
										value={field.value}
										onValueChange={(value) => {
											console.log('value', value);
										}}>
										<SelectTrigger>
											<SelectValue placeholder="Select Activity Type">
												{field.value}
											</SelectValue>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="AVAILABLE">
												Available
											</SelectItem>
											<SelectItem value="ON_BREAK">
												On Break
											</SelectItem>
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
