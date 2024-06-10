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
	deleteTimeSlot,
} from '../../../services/time-slot-service';
import {useToast} from '../../../components/ui/use-toast';
import {getTimeStringFromWholeDate, tryGetErrorMessage} from '../../../lib/utils';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../../components/ui/table';
import {useParams} from 'react-router-dom';
import {type BoatDto} from '../../../models/api/boat.model';
import EditTableCell from '../../../components/table/edit-table-cell';

const TimeSlots: React.FC<BoatDto> = (boat: BoatDto) => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
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

	const handleCreateTimeSlot = async (timeSlot: TimeSlotDto) => {
		try {
			if (!boatId) {
				return false;
			}

			timeSlot.boatId = Number(boatId);
			const createdTimeSlot = await createTimeSlot(timeSlot);
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
			const updatedTimeSlot = await updateTimeSlot(timeSlot.id, timeSlot);
			// Console.log(updatedTimeSlot);
			setTimeSlots([...timeSlots, updatedTimeSlot]);
		} catch (error) {
			console.error('Failed to update time slot:', error);
			return tryGetErrorMessage(error);
		}

		return true;
	};

	const handleDelete = async (timeSlotId: number) => {
		try {
			await deleteTimeSlot(timeSlotId);
			const updatedTimeSlots = timeSlots.filter(slot => slot.id !== timeSlotId);
			setTimeSlots(updatedTimeSlots);
			toast({
				description: 'Time slot successfully deleted.',
			});
		} catch (error) {
			console.error('Failed to delete time slot:', error);
			return tryGetErrorMessage(error);
		}
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
			<Table className="mt-5">
				<TableHeader>
					<TableRow>
						<TableHead>From</TableHead>
						<TableHead>To</TableHead>
						<TableHead>Type</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{timeSlots.map((slot, index) => (
						<TableRow key={index} className="w-full justify-between">
							<TableCell>{getTimeStringFromWholeDate(slot?.fromTime)}</TableCell>
							<TableCell>{getTimeStringFromWholeDate(slot.untilTime)}</TableCell>
							<TableCell>{slot.status === 'AVAILABLE' ? 'ride' : 'break'}</TableCell>
							<EditTableCell boat={boat} slot={slot} onDelete={handleDelete} onUpdate={handleUpdateTimeSlot}></EditTableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default TimeSlots;
