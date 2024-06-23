import {TimeSlotDto} from './time-slot.model';
import {ColumnDef} from '@tanstack/react-table';
import {PersonDto} from './person.model';
import {BoatDto} from './boat.model';
import {ActivityTypeDto} from './activity-type.model';

export type BookingSearchDto = {
	person: PersonDto;
	boat: BoatDto;
	timeSlot: TimeSlotDto;
	activityType: ActivityTypeDto;
};

export const bookingColumns: ColumnDef<BookingSearchDto>[] = [
	{
		accessorKey: 'person.firstName',
		header: 'First Name',
	},
	{
		accessorKey: 'person.lastName',
		header: 'Last Name',
	},
	{
		accessorKey: 'timeSlot.fromTime',
		header: 'From',
		cell: ({row}) =>
			row.original.timeSlot.fromTime
				? new Date(row.original.timeSlot.fromTime).toLocaleString()
				: '',
	},
	{
		accessorKey: 'timeSlot.untilTime',
		header: 'Until',
		cell: ({row}) =>
			row.original.timeSlot.untilTime
				? new Date(row.original.timeSlot.untilTime).toLocaleString()
				: '',
	},
	{
		accessorKey: 'activityType.name.en',
		header: 'Activity',
	},
	{
		accessorKey: 'boat.name',
		header: 'Boat',
	},
	{
		accessorKey: 'person.emailAddress',
		header: 'Email',
	},
	{
		accessorKey: 'person.phoneNumber',
		header: 'Phone',
	},
];
