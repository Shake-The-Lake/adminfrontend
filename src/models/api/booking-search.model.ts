import {type TimeSlotDto} from './time-slot.model';
import {type ColumnDef} from '@tanstack/react-table';
import {type PersonDto} from './person.model';
import {type BoatDto} from './boat.model';
import {type ActivityTypeDto} from './activity-type.model';

export type BookingSearchDto = {
	person: PersonDto;
	boat: BoatDto;
	timeSlot: TimeSlotDto;
	activityType: ActivityTypeDto;
};

export type BookingSearchParams = {
	personName?: string;
	boatName?: string;
	from?: string;
	to?: string;
	activity?: number;
};

export const defaultBookingSearchParams: BookingSearchParams = {
	personName: undefined,
	activity: undefined,
	boatName: undefined,
	from: undefined,
	to: undefined,
	
};

export const bookingColumns: Array<ColumnDef<BookingSearchDto>> = [
	{
		id: 'name', // Todo! adjust data table impl to not need this
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
