import React, {useEffect} from 'react';
import {type SubmitErrorHandler, type SubmitHandler, useForm} from 'react-hook-form';
import {z} from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel} from '../ui/form';
import {Input} from '../ui/input';
import {Button} from '../ui/button';
import {type EventDto} from '../../models/api/event.model';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from '../ui/use-toast';

export const eventFormSchema = z.object({
	title: z.string().min(5).max(20),
	description: z.string(),
	date: z.string().refine(val => !isNaN(Date.parse(val)), {
		message: 'Invalid date',
	}).transform(val => new Date(val)),
});

export const useEventForm = () =>
	useForm<z.infer<typeof eventFormSchema>>({
		// Resolver: zodResolver(eventFormSchema), validation disabled because of missing error handling & onSubmit doesnt work
		mode: 'onChange',
	});
	
export type EventFormSchema = z.infer<typeof eventFormSchema>;

type EventFormProps = {
	onSubmit: (dto: EventDto) => Promise<boolean | string>; // True if successfully saved, error if not
	model: EventDto;
	onSuccessfullySubmitted: () => void; 
};

const EventForm: React.FC<EventFormProps> = ({
	model,
	onSubmit,
	onSuccessfullySubmitted,
}) => {
	const form = useForm<EventFormSchema>({
		mode: 'onChange',
		defaultValues: model,
		resolver: zodResolver(eventFormSchema),
	});

	const onPrepareSubmit: SubmitHandler<EventFormSchema> = async (values) => {
		const event: EventDto = {
			...values,
			title: values.title,
			date: values.date,
		}; 

		const success = await onSubmit(event);
	
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

	const onInvalid: SubmitErrorHandler<EventFormSchema> = (errors) => {
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
				<form className="p-1 space-y-4" onSubmit={form.handleSubmit(onPrepareSubmit, onInvalid)} id="eventFrom">
					<FormField
						name="title"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder="Sommer Event 2024"
										{...field}
										className="input"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						name="description"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Input
										placeholder="Shake the Lake 2024"
										{...field}
										className="input"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						name="date"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Event Date</FormLabel>
								<FormControl>
									<Input type="datetime-local" {...field} className="input" />
								</FormControl>
							</FormItem>
						)}
					/>
					<Button type="submit" style={{display: 'none'}} />
				</form>
			</Form>
		</>
	);
};

export default EventForm;
