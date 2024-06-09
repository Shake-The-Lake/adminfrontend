import React, {useEffect, useState} from 'react';
import {
	defaultTimeSlot,
	type TimeSlotDto,
} from '../../../models/api/time-slot.model';
import StlDialog from '../../../components/dialog/stl-dialog';
import TimeSlotForm from '../../../components/forms/time-slot';
import {
	createTimeSlot,
	updateTimeSlot,
} from '../../../services/time-slot-service';
import {useToast} from '../../../components/ui/use-toast';
import {tryGetErrorMessage} from '../../../lib/utils';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../../components/ui/table';
import {useParams} from 'react-router-dom';
import {type BoatDto} from '../../../models/api/boat.model';

const TimeSlots: React.FC<BoatDto> = (boat: BoatDto) => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
	const [timeSlots, setTimeSlots] = useState<TimeSlotDto[]>([]);
	useEffect(() => {
		if (boat.timeSlots) {
			setTimeSlots([...boat.timeSlots]);
		}
	}, [boat]);

	const {toast} = useToast();
	const {boatId} = useParams<{boatId: string}>();

	const openCreateDialog = () => {
		setIsCreateDialogOpen(true);
	};

	const closeCreateDialog = () => {
		setIsCreateDialogOpen(false);
	};

	const openUpdateDialog = () => {
		setIsUpdateDialogOpen(true);
	};

	const closeUpdateDialog = () => {
		setIsUpdateDialogOpen(false);
	};

	const handleCreateTimeSlot = async (timeSlot: TimeSlotDto) => {
		try {
			if (!boatId) {
				return false;
			}

			timeSlot.boatId = Number(boatId);
			const createdTimeSlot = await createTimeSlot(timeSlot);
			console.log('Created time slot:', createdTimeSlot);

			setTimeSlots([...timeSlots, createdTimeSlot]);
		} catch (error) {
			console.error('Failed to create time slot:', error);
			return tryGetErrorMessage(error);
		}

		return true;
	};

	const handleUpdateTimeSlot = async (timeSlot: TimeSlotDto) => {
		try {
			if (!boatId) {
				return false;
			}

			timeSlot.boatId = Number(boatId);
			const updatedTimeSlot = await updateTimeSlot(boatId, timeSlot);
			console.log('Updated time slot:', updatedTimeSlot);

			setTimeSlots([...timeSlots, updatedTimeSlot]);
		} catch (error) {
			console.error('Failed to update time slot:', error);
			return tryGetErrorMessage(error);
		}

		return true;
	};

	return (
		<div>
			<div className="flex justify-between">
				<>
					<h1>Time Slots</h1>
					<StlDialog
						title="Add Time Slot"
						description="Add time slots to the boat"
						triggerLabel="Add time slot"
						isOpen={isCreateDialogOpen}
						onClose={closeCreateDialog}
						onOpen={openCreateDialog}
						isCard={false}>
						<TimeSlotForm
							model={{...defaultTimeSlot, boatId: boat.id}}
							onSubmit={handleCreateTimeSlot}
							boat={boat}
							isCreate={true}
							onSuccessfullySubmitted={() => {
								toast({
									description: 'Time slot successfully saved.',
								});
								closeCreateDialog();
							}}
						/>
					</StlDialog>
				</>
			</div>
			<Table>
				<TableCaption>A list of your recent time slots.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>From</TableHead>
						<TableHead>To</TableHead>
						<TableHead>Type</TableHead>
						<TableHead></TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{timeSlots.map((slot, index) => (
						<TableRow key={index}>
							<TableCell>{new Date(slot?.untilTime).toLocaleString('de-CH', {hour: '2-digit', minute: '2-digit'})}</TableCell>
							<TableCell>{new Date(slot.untilTime).toLocaleString('de-CH', {hour: '2-digit', minute: '2-digit'})}</TableCell>
							<TableCell>{slot.status === 'AVAILABLE' ? 'ride' : 'break'}</TableCell>
							<TableCell>
								<StlDialog
									title="Edit Time Slot"
									description="Edit time slots for the boat"
									triggerLabel="Edit time slot"
									isOpen={isUpdateDialogOpen}
									onClose={closeUpdateDialog}
									onOpen={openUpdateDialog}
									isCard={false}
									isIcon={true}>
									<TimeSlotForm
										model={slot}
										onSubmit={handleUpdateTimeSlot}
										isCreate={true}
										onSuccessfullySubmitted={() => {
											toast({
												description: 'Time slot successfully saved.',
											});
											closeUpdateDialog();
										}}
									/>
								</StlDialog>
							</TableCell>
							<TableCell>delete</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default TimeSlots;
