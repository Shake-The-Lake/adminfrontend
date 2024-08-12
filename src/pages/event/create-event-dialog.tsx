import React from 'react';
import {z} from 'zod';
import {defaultEventDto, type EventDto} from '../../models/api/event.model';
import {createEvent} from '../../services/event-service';
import StlDialog from '../../components/dialog/stl-dialog';
import EventForm from '../../components/forms/event';
import {tryGetErrorMessage} from '../../lib/utils';
import {toast} from '../../components/ui/use-toast';

// Todo! sometimes this generates an error, investigate sometime
// Cannot update a component (`CreateEventDialog`) while rendering a different component (`Controller`). To locate the bad setState() call inside `Controller`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
const CreateEventDialog: React.FC = () => {

	const handleSubmit = async (dto: EventDto) => {
		try {
			await createEvent(dto);
		} catch (error) {
			console.error('Failed to create event:', error);
			return tryGetErrorMessage(error);
		}

		return true;
	};

	return (
		<StlDialog
			title="Create Event"
			description="Add a new event by entering the basic meta data needed."
			triggerLabel="Add new event"
			formId="event">
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
