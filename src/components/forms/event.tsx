import React from 'react';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {z} from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel} from '../ui/form';
import {Input} from '../ui/input';
import {Button} from '../ui/button';
import {type EventDto} from '../../models/api/event.model';
import {zodResolver} from '@hookform/resolvers/zod';
import {onInvalidFormHandler} from '../../lib/utils';
import {UseMutationResult} from '@tanstack/react-query';
import {MutationToaster} from '../common/mutation-toaster';

export const eventFormSchema = z.object({
	title: z.string().min(5).max(20),
	description: z.string(),
	date: z
		.string()
		.refine((val) => !isNaN(Date.parse(val)), {
			message: 'Invalid date',
		})
		.transform((val) => new Date(val)),
});

export const useEventForm = () =>
	useForm<z.infer<typeof eventFormSchema>>({
		// Resolver: zodResolver(eventFormSchema), validation disabled because of missing error handling & onSubmit doesnt work
		mode: 'onChange',
	});

export type EventFormSchema = z.infer<typeof eventFormSchema>;

type EventFormProps = {
	model: EventDto;
	mutation: UseMutationResult<any, Error, EventDto, unknown>; // first any is return type, second is input
	isCreate: boolean;
};

const EventForm: React.FC<EventFormProps> = ({model, mutation, isCreate}) => {
	const form = useForm<EventFormSchema>({
		mode: 'onChange',
		defaultValues: model,
		resolver: zodResolver(eventFormSchema),
	});

	const onSubmit: SubmitHandler<EventFormSchema> = async (values) => {
		const event: EventDto = {
			...values,
			title: values.title,
			date: values.date,
		};

		await mutation.mutateAsync(event);
	};

	return (
		<>
			<MutationToaster
				type={isCreate ? 'create' : 'update'}
				mutation={mutation}
			/>
			<Form {...form}>
				<form
					className="p-1 space-y-4"
					onSubmit={form.handleSubmit(onSubmit, onInvalidFormHandler)}
					id="event">
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

export default EventForm;
