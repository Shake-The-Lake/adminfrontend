import React from 'react';
import { Trash } from 'lucide-react';
import { TableCell } from '../ui/table';
import { Button } from '../ui/button';
import { type UseMutationResult } from '@tanstack/react-query';
import { type BookingDto } from '../../models/api/booking.model';
import { useTranslation } from 'react-i18next';

type EditBookingTableCellProps = {
	booking: BookingDto;
	deleteMutation: UseMutationResult<any, Error, number>; // First any is return type, second is input
};

const EditBookingTableCell: React.FC<EditBookingTableCellProps> = ({
	booking,
	deleteMutation,
}) => {
	const { t } = useTranslation();
	const handleDelete = async () => deleteMutation.mutateAsync(booking?.id ?? 0);

	return (
		<TableCell className="text-right">
			<Button
				variant="ghost"
				size="icon"
				className="items-center"
				onClick={handleDelete}
				title={t('delete')}
				aria-label={t('delete')}>
				<Trash className="cursor-pointer hover:text-red-600" />
			</Button>
		</TableCell>
	);
};

export default EditBookingTableCell;
