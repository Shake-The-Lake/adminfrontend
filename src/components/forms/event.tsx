import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {z} from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel} from '../ui/form';
import {Input} from '../ui/input';

export const eventFormSchema = z.object({
	title: z.string().min(5).max(20),
	description: z.string(),
	date: z.string(),
	startedAt: z.string(),
	customerOnlyTime: z.string(),
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
		//resolver: zodResolver(eventFormSchema), validation disabled because of missing error handling & onSubmit doesnt work
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
							<FormLabel>Date</FormLabel>
							<FormControl>
								<Input type="datetime-local" {...field} className="input" />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name="startedAt"
					control={form.control}
					render={({field}) => (
						<FormItem>
							<FormLabel>Internal Start</FormLabel>
							<FormControl>
								<Input type="datetime-local" {...field} className="input" />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name="customerOnlyTime"
					control={form.control}
					render={({field}) => (
						<FormItem>
							<FormLabel>External Start</FormLabel>
							<FormControl>
								<Input type="datetime-local" {...field} className="input" />
							</FormControl>
						</FormItem>
					)}
				/>
				<button type="submit" style={{display: 'none'}} />
			</form>
		</Form>
	);
};

export default EventForm;
