import {type TimeSlotDto} from './time-slot.model';
import {type ColumnDef} from '@tanstack/react-table';
import {type PersonDto} from './person.model';
import {type BoatDto} from './boat.model';
import {type ActivityTypeDto} from './activity-type.model';
import {getDisplayTimeFromBackend} from '../../lib/date-time.utils';

export type BookingSearchDto = {
	person: PersonDto;
	boat: BoatDto;
	timeSlot: TimeSlotDto;
	activityType: ActivityTypeDto;
};

export type BookingSearchParams = {
	personName?: string;
	boatId?: number;
	from?: string;
	to?: string;
	activityId?: number;
};

export const defaultBookingSearchParams: BookingSearchParams = {
	personName: undefined,
	activityId: undefined,
	boatId: undefined,
	from: undefined,
	to: undefined,	
};

export const bookingColumns: Array<ColumnDef<BookingSearchDto>> = [
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
		cell: ({row}) => getDisplayTimeFromBackend(row.original.timeSlot.fromTime),
	},
	{
		accessorKey: 'timeSlot.untilTime',
		header: 'Until',
		cell: ({row}) => getDisplayTimeFromBackend(row.original.timeSlot.untilTime),
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
