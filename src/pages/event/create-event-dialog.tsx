import React from 'react';
import {defaultEventDto, type EventDto} from '../../models/api/event.model';
import {createEvent} from '../../services/event-service';
import StlDialog from '../../components/dialog/stl-dialog';
import EventForm from '../../components/forms/event';
import {tryGetErrorMessage} from '../../lib/utils';
import {toast} from '../../components/ui/use-toast';
import {useNavigate} from 'react-router-dom';

const CreateEventDialog: React.FC = () => {
	const navigate = useNavigate();

	const handleSubmit = async (dto: EventDto) => {
		try {
			const response = await createEvent(dto);
			navigate('/event/' + response.id);
			return true;
		} catch (error) {
			console.error('Failed to create event:', error);
			return tryGetErrorMessage(error);
		}
	};

	return (
		<StlDialog
			title="Create Event"
			description="Add a new event by entering the basic meta data needed."
			triggerLabel="Add new event"
			formId="event"
		>
			<EventForm
				onSubmit={handleSubmit}
				onSuccessfullySubmitted={() => {
					toast({
						description: 'Event successfully saved.',
					});
				}}
				model={defaultEventDto}
			/>
		</StlDialog>
	);
};

export default CreateEventDialog;
