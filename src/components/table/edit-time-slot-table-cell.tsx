import React, { useState } from 'react';
import { Trash } from 'lucide-react';
import { type TimeSlotDto } from '../../models/api/time-slot.model';
import { TableCell } from '../ui/table';
import StlDialog from '../dialog/stl-dialog';
import TimeSlotForm from '../forms/time-slot';
import { type BoatDto } from '../../models/api/boat.model';
import { Button } from '../ui/button';
import { type UseMutationResult } from '@tanstack/react-query';
import { useUpdateTimeSlot } from '../../queries/time-slot';
import { useTranslation } from 'react-i18next';

type EditTimeSlotTableCellProps = {
	timeSlot: TimeSlotDto;
	boat: BoatDto;
	eventId: number;
	deleteMutation: UseMutationResult<any, Error, number>; // First any is return type, second is input
};

const EditTimeSlotTableCell: React.FC<EditTimeSlotTableCellProps> = ({
	timeSlot,
	boat,
	eventId,
	deleteMutation,
}) => {
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
	const { t } = useTranslation();
	const updateMutation = useUpdateTimeSlot(timeSlot?.id, eventId);
	const handleDelete = async () => deleteMutation.mutateAsync(timeSlot?.id);

	const openUpdateDialog = () => {
		setIsUpdateDialogOpen(true);
	};

	const closeUpdateDialog = () => {
		setIsUpdateDialogOpen(false);
	};

	return (
		<TableCell className="text-right">
			<StlDialog
				title={t('timeSlot.edit')}
				description={t('timeSlot.editDescription')}
				triggerLabel={t('timeSlot.edit')}
				isOpen={isUpdateDialogOpen}
				onClose={closeUpdateDialog}
				onOpen={openUpdateDialog}
				isCard={false}
				isIcon={true}
				formId="timeSlot">
				<TimeSlotForm
					model={timeSlot}
					mutation={updateMutation}
					isCreate={false}
					boat={boat}
					onSuccessfullySubmitted={closeUpdateDialog}
				/>
			</StlDialog>
			<Button
				variant="ghost"
				size="icon"
				className="items-center"
				onClick={handleDelete}
				aria-label="Delete Time Slot">
				<Trash className="cursor-pointer hover:text-red-600" />
			</Button>
		</TableCell>
	);
};

export default EditTimeSlotTableCell;
