import React, {useState} from 'react';
import {Trash} from 'lucide-react';
import {type TimeSlotDto} from '../../models/api/time-slot.model';
import {TableCell} from '../ui/table';
import StlDialog from '../dialog/stl-dialog';
import TimeSlotForm from '../forms/time-slot';
import {type BoatDto} from '../../models/api/boat.model';
import {toast} from '../ui/use-toast';
import {Button} from '../ui/button';

type EditTableCellProps = {
	onUpdate: (dto: TimeSlotDto) => Promise<boolean | string>;
	slot: TimeSlotDto;
	boat: BoatDto;
	onDelete: (id: number) => void;
};

const EditTableCell: React.FC<EditTableCellProps> = ({
	onUpdate,
	onDelete,
	slot,
	boat,
}) => {

	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);


	const openUpdateDialog = () => {
		setIsUpdateDialogOpen(true);
	};

	const closeUpdateDialog = () => {
		setIsUpdateDialogOpen(false);
	};

  

	return (
		<TableCell className='text-right'>
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
					onSubmit={onUpdate}
					isCreate={true}
					boat={boat}
					onSuccessfullySubmitted={() => {
						toast({
							description: 'Time slot successfully updated.',
						});
						closeUpdateDialog();
					}}
				/>
			</StlDialog>
			<Button
				variant="ghost"
				size="icon"
				className="items-center"
				onClick={async () => {
					onDelete(slot.id); 
				}}>
				<Trash className="cursor-pointer hover:text-red-600" />
			</Button>
		</TableCell>
	);
};

export default EditTableCell;