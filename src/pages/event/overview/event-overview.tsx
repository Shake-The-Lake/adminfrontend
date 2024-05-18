import React, {useEffect, useState} from 'react';
import EventForm, {
	EventFormSchema,
	eventFormSchema,
} from '../../../components/forms/event';
import {getEventById} from '../../../services/event-service';
import type {SubmitHandler} from 'react-hook-form';
import {z} from 'zod';
import {useLocation, useNavigate} from 'react-router-dom';

const EventOverview: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	/* not quite happy with this solution to read out the event id
  but it didnt worked with useParams...
  */

	const eventId = location.pathname.split('/').pop();

	const [defaultValues, setDefaultValues] =
		useState<Partial<EventFormSchema> | null>(null);

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				if (!eventId) {
					console.error('Event ID is not defined');
					navigate('/');
					return;
				}
				const event = await getEventById(Number(eventId));
				const transformedEvent = {
					title: event.title,
					description: event.description,
					date: event.date.split('.')[0],
					startedAt: event.startedAt.split('.')[0],
					customerOnlyTime: event.customerOnlyTime.split('.')[0],
					location: event.location?.name || '',
				};
				setDefaultValues(transformedEvent);
			} catch (error) {
				console.error('Error fetching event:', error);
			}
		};

		fetchEvent();
	}, [eventId, navigate]);

	const handleSubmit: SubmitHandler<z.infer<typeof eventFormSchema>> = async (
		data,
	) => {
		console.log('Form submitted:', data);
		// TODO
	};

	if (!defaultValues) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col items-center py-24">
			<EventForm onSubmit={handleSubmit} defaultValues={defaultValues} />
		</div>
	);
};

export default EventOverview;
