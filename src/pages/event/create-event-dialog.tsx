import React, {useEffect} from 'react';
import {defaultEventDto} from '../../models/api/event.model';
import StlDialog from '../../components/dialog/stl-dialog';
import EventForm from '../../components/forms/event';
import {useCreateEvent} from '../../queries/event';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const CreateEventDialog: React.FC = () => {
	const navigate = useNavigate();
	const createMutation = useCreateEvent();
	const {t} = useTranslation();

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
			title={t('event.create')}
			description={t('event.description')}
			triggerLabel={t('event.triggerLabel')}
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
