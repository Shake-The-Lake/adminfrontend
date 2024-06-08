import React, {useEffect, useState} from 'react';
import {type TimeSlotDto} from '../../../models/api/time-slot.model';
import StlDialog from '../../../components/dialog/stl-dialog';
import TimeSlotForm from '../../../components/forms/time-slot';
import {updateTimeSlot} from '../../../services/time-slot-service';
import {useToast} from '../../../components/ui/use-toast';
import {tryGetErrorMessage} from '../../../lib/utils';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '../../../components/ui/table';
import {useParams} from 'react-router-dom';
import {updateBoat} from '../../../services/boat-service';
import {type BoatDto} from '../../../models/api/boat.model';

const TimeSlots: React.FC<BoatDto> = (boat: BoatDto) => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const [timeSlots, setTimeSlots] = useState<Set<TimeSlotDto>>(new Set());
	useEffect(() => {
		if (boat.timeSlots) {
			setTimeSlots(boat.timeSlots);
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

	const handleUpdateTimeSlots = async (timeSlot: TimeSlotDto) => {
		try {
			if (!boatId) {
				return;
			}

			timeSlot.boatId = Number(boatId);
			console.log('Time slot:', timeSlot);
			const updatedTimeSlot = await updateTimeSlot(boatId, timeSlot);
			console.log('Updated time slot:', updatedTimeSlot);
		} catch (error) {
			console.error('Failed to update time slot:', error);
			return tryGetErrorMessage(error);
		}
	};

	return (
		<div>
			<div className="flex justify-between">
				<>
					<h1>Time Slots</h1>
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
							onSuccessfullySubmitted={() => {
								toast({
									description: 'Time slot successfully saved.',
								});
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
					{[...timeSlots].map((slot, index) => (
						<TableRow key={index}>
							<TableCell>{slot.fromTime?.toString()}</TableCell>
							<TableCell>{slot.untilTime?.toString()}</TableCell>
							<TableCell>{slot.status}</TableCell>
							<TableCell>edit</TableCell>
							<TableCell>delete</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default TimeSlots;
