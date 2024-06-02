import React from 'react';
import {type SubmitHandler} from 'react-hook-form';
import {z} from 'zod';
import {useNavigate} from 'react-router-dom';
import {type EventDto} from '../../models/api/event.model';
import {createEvent} from '../../services/event-service';
import StlDialog from '../../components/dialog/stl-dialog';
import EventForm, {useEventForm} from '../../components/forms/event';

const formSchema = z.object({
	title: z.string().min(5).max(20),
	description: z.string(),
	date: z.string(),
	location: z.string(),
});

// Todo! sometimes this generates an error, investigate sometime
// Cannot update a component (`CreateEventDialog`) while rendering a different component (`Controller`). To locate the bad setState() call inside `Controller`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
const CreateEventDialog: React.FC = () => {
	const navigate = useNavigate();
	const form = useEventForm();

	const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values) => {
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
			boatIds: [],
			isStarted: false,
		};
		try {
			const createdEvent = createEvent({...form.getValues(), ...event}).then(
				(response) => {
					navigate('/event/' + response.id);
					return response.id;
				},
			);
			console.log('Created event:', createdEvent);
		} catch (error) {
			console.error('Failed to create event:', error);
			return false;
		}

		return true;
	};

	return (
		<StlDialog
			title="Create Event"
			description="Add a new event by entering the basic meta data needed."
			triggerLabel="Add new event"
			onSubmit={() => handleSubmit(form.getValues())}>
			<EventForm form={form} />
		</StlDialog>
	);
};

export default CreateEventDialog;
