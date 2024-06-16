import {TimeSlotDto} from './time-slot.model';
import {ColumnDef} from '@tanstack/react-table';

export type BookingDto = {
	id?: number;
	isRider: boolean;
	isManual: boolean;
	pagerNumber?: number;
	person: string;
	timeSlot: TimeSlotDto;
};

export const columns: ColumnDef<BookingDto>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'from',
		header: 'From',
	},
	{
		accessorKey: 'To',
		header: 'To',
	},
	{
		accessorKey: 'activity',
		header: 'Activity',
	},
	{
		accessorKey: 'boat',
		header: 'Boat',
	},
	{
		accessorKey: 'pager',
		header: 'Pager',
	},
	{
		accessorKey: 'relation',
		header: 'Relation',
	},
];
