import React, {useState} from 'react';
import {Book, PencilIcon, Trash} from 'lucide-react';
import {type TimeSlotDto} from '../../models/api/time-slot.model';
import {TableCell} from '../ui/table';
import StlDialog from '../dialog/stl-dialog';
import TimeSlotForm from '../forms/time-slot';
import {type BoatDto} from '../../models/api/boat.model';
import {Button} from '../ui/button';
import {type UseMutationResult} from '@tanstack/react-query';
import {useUpdateTimeSlot} from '../../queries/time-slot';
import {type BookingDto} from '../../models/api/booking.model';
import {useUpdateBooking} from '../../queries/booking';
import {Link} from 'react-router-dom';
import {eventDetailRoutes} from '../../constants';

type EditBookingTableCellProps = {
	booking: BookingDto;
	deleteMutation: UseMutationResult<any, Error, number>; // First any is return type, second is input
};

const EditBookingTableCell: React.FC<EditBookingTableCellProps> = ({
	booking,
	deleteMutation,
}) => {

	const handleDelete = async () => deleteMutation.mutateAsync(booking?.id);

	return (
		<TableCell className="text-right">
			<Link to={`${eventDetailRoutes.addBooking}`} relative='route'>
				<Button type='button' title='Edit Booking' variant='ghost' >
					<PencilIcon></PencilIcon>
				</Button>
			</Link>
			<Button
				variant="ghost"
				size="icon"
				className="items-center"
				onClick={handleDelete}>
				<Trash className="cursor-pointer hover:text-red-600" />
			</Button>
		</TableCell>
	);
};

export default EditBookingTableCell;
