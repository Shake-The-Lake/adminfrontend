import {type ActivityTypeDto} from './activity-type.model';
import type {ColumnDef} from '@tanstack/react-table';

export type TimeSlotDto = {
	id: number;
	fromTime?: Date; // Assuming ISO string format for LocalDateTime
	untilTime?: Date; // Assuming ISO string format for LocalDateTime
	boatId?: number;
	activityTypeId?: number;
	activityType?: ActivityTypeDto | undefined;
	bookingIds?: Set<number>;
	status: string; // Todo! remove this status after backend is updated
};

export const defaultTimeSlot: TimeSlotDto = {
	id: 0,
	fromTime: new Date(),
	untilTime: new Date(),
	boatId: 0,
	status: 'AVAILABLE', // Todo! remove this status after backend is updated
	bookingIds: undefined,
	activityType: undefined,
	activityTypeId: 0,
};

export const timeSlotColumns: Array<ColumnDef<TimeSlotDto>> = [
	{
		id: 'from',
		accessorKey: 'fromTime',
		header: 'From',
	},
	{
		id: 'tp',
		accessorKey: 'untilTime',
		header: 'To',
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
