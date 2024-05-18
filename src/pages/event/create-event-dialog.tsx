import React from 'react';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from 'react-router-dom';
import {type EventDto} from '../../models/api/event.model';
import {createEvent} from '../../services/event-service';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '../../components/ui/form';
import {Input} from '../../components/ui/input';
import {Button} from '../../components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../components/ui/dialog';

const formSchema = z.object({
	title: z.string().min(5).max(20),
	description: z.string(),
	date: z.string(),
	startedAt: z.string(),
	customerOnlyTime: z.string(),
	location: z.string(),
});

// Todo! sometimes this generates an error, investigate sometime
// Cannot update a component (`CreateEventDialog`) while rendering a different component (`Controller`). To locate the bad setState() call inside `Controller`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
const CreateEventDialog: React.FC = () => {
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values) => {
		// TODO sync for design/prototyp update: how to implement further form inputs for location properties
		const today = new Date();
		const todayAsString = today.toISOString();
		const event: EventDto = {
			id: 0,
			title: values.title,
			description: values.description,
			location: {
				id: 0,
				name: values.location,
				street: '',
				streetNr: 0,
				town: '',
				postalCode: 0,
				canton: '',
			},
			date: values.date,
			customerCode: 'abcdefg', // TODO: backend does not allow null values here anymore but Design does not include creating customer code in creat event popup
			employeeCode: '',
			customerOnlyTime: values.customerOnlyTime,
			isStarted: false,
			startedAt: values.startedAt,
			endedAt: todayAsString, // TODO Frontend UI does not have end dates jet planned.
		};
		try {
			const createdEvent = createEvent(event);
			console.log('Created event:', createdEvent);
			navigate('/');
		} catch (error) {
			console.error('Failed to create event:', error);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full text-center">Add new event</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md h-full">
				<DialogHeader>
					<DialogTitle>Create Event</DialogTitle>
					<DialogDescription>
						Add a new event by entering the basic meta data needed.
					</DialogDescription>
				</DialogHeader>
				<div className="grow-0 overflow-auto min-h-32">
					<Form {...form}>
						<form className="p-1">
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
								)}></FormField>
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
								)}></FormField>
							{/* Location ist currently just a single string field for simplicity
							In the Future we will need some more fields or a seperate form to fill the date for the location
							*/}
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
								)}></FormField>

							<FormField
								name="date"
								control={form.control}
								render={({field}) => (
									<FormItem>
										<FormLabel>Date</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												className="input"
											/>
										</FormControl>
									</FormItem>
								)}></FormField>
							<FormField
								name="startedAt"
								control={form.control}
								render={({field}) => (
									<FormItem>
										<FormLabel>Internal Start</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												className="input"
											/>
										</FormControl>
									</FormItem>
								)}></FormField>
							<FormField
								name="customerOnlyTime"
								control={form.control}
								render={({field}) => (
									<FormItem>
										<FormLabel>External Start</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												className="input"
											/>
										</FormControl>
									</FormItem>
								)}></FormField>
						</form>
					</Form>
				</div>
				<DialogFooter className="justify-end items-end">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Cancel
						</Button>
					</DialogClose>
					<Button
						type="submit"
						disabled={!form.formState.isValid}
						onClick={form.handleSubmit(onSubmit)}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateEventDialog;
