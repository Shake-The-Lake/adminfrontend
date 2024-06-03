import React, {useState} from 'react';
import {type TimeSlotDto} from '../../../models/api/time-slot.model';
import StlDialog from '../../../components/dialog/stl-dialog';
import TimeSlotForm from '../../../components/forms/time-slot';
import {updateTimeSlot} from '../../../services/time-slot-service';
import {useToast} from '../../../components/ui/use-toast';
import {tryGetErrorMessage} from '../../../lib/utils';

type TimeSlotsProps = {
	timeSlots?: Set<TimeSlotDto>;
};

const TimeSlots: React.FC<TimeSlotsProps> = (props) => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

	const openCreateDialog = () => {
		setIsCreateDialogOpen(true);
	};

	const closeCreateDialog = () => {
		setIsCreateDialogOpen(false);
	};

	const handleUpdateTimeSlots = async (timeSlots: TimeSlotDto) => {
		try {
			const updatedTimeSlot = await updateTimeSlot(
				0,
				timeSlots);
			console.log('Updated time slots:', updatedTimeSlot);
			return true;
		} catch (error) {
			console.error('Failed to update time slots:', error);
			return tryGetErrorMessage(error);
		}
	};

	const {toast} = useToast();

	return (
		<div className="flex justify-between">
			{
				<><h1>Time Slots</h1>
					<StlDialog
						title="Add time Slots"
						description="Add time slots to the boat"
						triggerLabel="Add time slots"
						isOpen={isCreateDialogOpen}
						onClose={closeCreateDialog}
						onOpen={openCreateDialog}
						isCard={false}
					>
						<TimeSlotForm 
							onSubmit={handleUpdateTimeSlots}
							isCreate={true}
							onSuccessfullySubmitted={function (): void {
								toast({
									description: 'Activity Type successfully saved.',
								});
							}}>
						</TimeSlotForm>
					</StlDialog></>
			}
		</div>
	);
};

export default TimeSlots;