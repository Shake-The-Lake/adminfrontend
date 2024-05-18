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
import LoadingSpinner from '../../../components/animations/loading';

const EventOverview: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	/* not quite happy with this solution to read out the event id
  but it didnt worked with useParams...
  */

	const eventId = location.pathname.split('/').pop();

	const [defaultValues, setDefaultValues] =
		useState<Partial<EventFormSchema> | null>(null);
	const [isLoading, setIsLoading] = useState(true);

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
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching event:', error);
				setIsLoading(false);
			}
		};

		fetchEvent();
	}, [eventId, navigate]);

	const handleSubmit: SubmitHandler<z.infer<typeof eventFormSchema>> = async (
		data,
	) => {
		console.log('Form submitted:', data);
		// TODO implement / renew backend endpoint
	};

	return (
		<div className="flex flex-col lg:flex-row items-start justify-between px-20 py-20 max-h-fit w-full">
			<LoadingSpinner isLoading={isLoading} />
			<div className="w-full lg:w-1/2 pr-10">
				<h1 className="text-2xl font-bold mb-4">Basic Data</h1>
				<p className="mb-8 text-gray-600">Enter the basic data for the event</p>
				<EventForm onSubmit={handleSubmit} defaultValues={defaultValues} />
			</div>
			<div className="w-full lg:w-1/2 flex flex-col">
				<EntryValidation />
				<div className="mt-40 flex justify-end">
					<button className="bg-primary text-white px-4 py-2 rounded-md">
						Save Changes
					</button>
				</div>
			</div>
		</div>
	);
};

export default EventOverview;
