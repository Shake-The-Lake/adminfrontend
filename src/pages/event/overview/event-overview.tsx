import React, {useEffect, useState} from 'react';
import EventForm, {
	type EventFormSchema,
	useEventForm,
} from '../../../components/forms/event';
import {getEventById, updateEvent} from '../../../services/event-service';
import {type SubmitHandler} from 'react-hook-form';
import {useLocation, useNavigate} from 'react-router-dom';
import EntryValidation from '../../../components/entry-validation/entry-validation';
import LoadingSpinner from '../../../components/animations/loading';

const EventOverview: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const eventId = location.pathname.split('/').pop();
	const [eventTitle, setEventTitle] = useState('');
	const [defaultValues, setDefaultValues] = useState<
	Partial<EventFormSchema> | undefined
	>(undefined);
	const form = useEventForm();
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
				setEventTitle(event.title);
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

		fetchEvent()
			.then(() => 'obligatory for @typescript-eslint/no-floating-promises')
			.catch(() => 'obligatory for @typescript-eslint/no-floating-promises');
	}, [eventId, navigate]);

	const handleUpdate: SubmitHandler<EventFormSchema> = async (event) => {
		try {
			const updatedEvent = {
				...event,
				// Add fields witch are not covered yet by the ui TODO: fix this
				endedAt: new Date().toISOString(),
				customerCode: 'dummyCustomerCode',
				employeeCode: 'dummyEmployeeCode',
			};
			setEventTitle(event.title);
			await updateEvent(Number(eventId), updatedEvent);
		} catch (error) {
			console.error('Error updating event:', error);
		}
	};

	return (
		<div className="flex flex-col items-start justify-between px-20 py-10 max-h-fit w-full">
			<LoadingSpinner isLoading={isLoading} />

			<div className="w-full mb-10 flex justify-start">
				<h2 className="text-2xl font-bold">{eventTitle}</h2>
			</div>

			<div className="w-full flex flex-col lg:flex-row">
				<div className="w-full lg:w-1/2 pr-10">
					<h1 className="text-2xl font-bold mb-4">Basic Data</h1>
					<p className="mb-8 text-gray-600">
						Enter the basic data for the event
					</p>
					<EventForm form={form} defaultValues={defaultValues} />
				</div>
				<div className="hidden lg:block border-l border-gray-300 mx-4"></div>
				<div className="w-full lg:w-1/2 flex flex-col">
					<EntryValidation />
					<div className="mt-40 flex justify-end">
						<button
							type="submit"
							onClick={form.handleSubmit(handleUpdate)}
							className="bg-primary text-white px-4 py-2 rounded-md">
							Save Changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventOverview;
