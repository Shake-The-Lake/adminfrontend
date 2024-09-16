import React from 'react';
import {Book, PencilIcon, Trash} from 'lucide-react';
import {TableCell} from '../ui/table';
import {Button} from '../ui/button';
import {type UseMutationResult} from '@tanstack/react-query';
import {type BookingDto} from '../../models/api/booking.model';
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
				<Button type='button' title='Edit Booking' variant='ghost' disabled={true}>
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
