import React, {useEffect} from 'react';
import {defaultEventDto} from '../../models/api/event.model';
import StlDialog from '../../components/dialog/stl-dialog';
import EventForm from '../../components/forms/event';
import {useCreateEvent} from '../../queries/event';
import {useNavigate} from 'react-router-dom';

// Todo! sometimes this generates an error, investigate sometime
// Cannot update a component (`CreateEventDialog`) while rendering a different component (`Controller`). To locate the bad setState() call inside `Controller`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
const CreateEventDialog: React.FC = () => {
	const navigate = useNavigate();
	const createMutation = useCreateEvent();

	useEffect(() => {
		if (
			createMutation &&
			createMutation.isSuccess &&
			Boolean(createMutation.data?.id)
		) {
			navigate('/event/' + createMutation.data.id);
		}
	}, [createMutation?.isSuccess, createMutation?.data?.id]);

	return (
		<StlDialog
			title="Create Event"
			description="Add a new event by entering the basic meta data needed."
			triggerLabel="Add new event"
			formId="event">
			<EventForm
				mutation={createMutation}
				model={defaultEventDto}
				isCreate={true}
			/>
		</StlDialog>
	);
};

export default CreateEventDialog;
