import React, {useEffect} from 'react';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {z} from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel} from '../ui/form';
import {Input} from '../ui/input';
import {Button} from '../ui/button';

export const eventFormSchema = z.object({
	title: z.string().min(5).max(20),
	description: z.string(),
	date: z.string(),
	location: z.string(),
});

export type EventFormSchema = z.infer<typeof eventFormSchema>;

type EventFormProps = {
	onSubmit?: SubmitHandler<z.infer<typeof eventFormSchema>>;
	defaultValues?: Partial<EventFormSchema>;
	form: ReturnType<typeof useEventForm>;
};

export const useEventForm = () =>
	useForm<z.infer<typeof eventFormSchema>>({
		// Resolver: zodResolver(eventFormSchema), validation disabled because of missing error handling & onSubmit doesnt work
		mode: 'onChange',
	});

const EventForm: React.FC<EventFormProps> = ({
	onSubmit,
	defaultValues,
	form,
}) => {
	useEffect(() => {
		if (defaultValues) {
			form.reset(defaultValues);
		}
	}, [defaultValues, form]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = form.getValues();
		if (onSubmit) {
			onSubmit(data);
		}
	};

	return (
		<Form {...form}>
			<form className="p-1 space-y-4" onSubmit={handleSubmit}>
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
					name="location"
					control={form.control}
					render={({field}) => (
						<FormItem>
							<FormLabel>Location</FormLabel>
							<FormControl>
								<Input {...field} className="input" />
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
	);
};

export default EventForm;
