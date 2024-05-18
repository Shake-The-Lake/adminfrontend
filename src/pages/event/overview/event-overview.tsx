import React, {useEffect, useState} from 'react';
import EventForm, {
	EventFormSchema,
	eventFormSchema,
} from '../../../components/forms/event';
import {getEventById} from '../../../services/event-service';
import type {SubmitHandler} from 'react-hook-form';
import {z} from 'zod';
import {useLocation, useNavigate} from 'react-router-dom';
import EntryValidation from '../../../components/entry-validation/entry-validation';

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
		<div className="flex flex-col lg:flex-row items-start justify-between px-20 py-20 max-h-fit w-full">
			<div className="w-full lg:w-1/2 pr-10">
				<h1 className="text-2xl font-bold mb-4">Basic Data</h1>
				<p className="mb-8 text-gray-600">Enter the basic data for the event</p>
				<EventForm onSubmit={handleSubmit} defaultValues={defaultValues} />
			</div>
			<EntryValidation></EntryValidation>
		</div>
	);
};

export default EventOverview;
