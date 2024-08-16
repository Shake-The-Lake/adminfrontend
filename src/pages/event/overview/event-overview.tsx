import React, {useEffect, useState, useRef} from 'react';
import EventForm from '../../../components/forms/event';
import {getEventById, updateEvent} from '../../../services/event-service';
import {useLocation, useNavigate} from 'react-router-dom';
import LoadingSpinner from '../../../components/animations/loading';
import {Button} from '../../../components/ui/button';
import {toast} from '../../../components/ui/use-toast';
import {defaultEventDto, type EventDto} from '../../../models/api/event.model';
import {tryGetErrorMessage} from '../../../lib/utils';

const EventOverview: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const eventId = location.pathname.split('/').pop();

	const [defaultValues, setDefaultValues] = useState<EventDto>(defaultEventDto);
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
				const transformedEvent: EventDto = {
					title: event.title,
					description: event.description,
					date: event.date,
				};
				setDefaultValues(transformedEvent);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching event:', error);
				setIsLoading(false);
			}
		};

		fetchEvent()
			.then(() => 'obligatory for @typescript-eslint/no-floating-promises')
			.catch(() => 'obligatory for @typescript-eslint/no-floating-promises');
	}, [eventId, navigate]);

	const handleUpdate = async (event: EventDto) => {
		try {
			await updateEvent(Number(eventId), event);
		} catch (error) {
			console.error('Error updating event:', error);
			return tryGetErrorMessage(error);
		}

		return true;
	};

	return (
		<div className="flex flex-col items-start justify-between max-h-fit w-full">
			<LoadingSpinner isLoading={isLoading} />

			<div className="w-full flex flex-col lg:flex-row">
				<div className="w-full my-2">
					<h1>Basic Data</h1>
					<p className="mt-2 mb-8 text-gray-600">
						Enter the basic data for the event
					</p>
					<EventForm 
						onSubmit={handleUpdate}						
						onSuccessfullySubmitted={() => {
							toast({
								description: 'Event successfully saved.',
							});
						}}
						model={defaultValues}
					/>
				</div>
			</div>
			<div className="mt-4 flex justify-end w-full">
				<Button type="submit" form="event">
					Save Changes
				</Button>
			</div>
		</div>
	);
};

export default EventOverview;
