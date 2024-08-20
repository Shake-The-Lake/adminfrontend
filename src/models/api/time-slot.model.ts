import {type ActivityTypeDto} from './activity-type.model';
import type {ColumnDef} from '@tanstack/react-table';
import {type BoatDto} from './boat.model';
import {localeToLocalizedStringProperty} from '../../lib/utils';

export type TimeSlotDto = {
	id: number;
	fromTime?: string; // Assuming ISO string format for LocalDateTime
	untilTime?: string; // Assuming ISO string format for LocalDateTime
	boatId?: number;
	boat?: BoatDto;
	activityType?: ActivityTypeDto;
	activityTypeId?: number;
	bookingIds?: Set<number>;
	status: string; // Todo! remove this status after backend is updated
};

export const defaultTimeSlot: TimeSlotDto = {
	id: 0,
	fromTime: new Date().toLocaleTimeString(),
	untilTime: new Date().toLocaleTimeString(),
	boatId: 0,
	status: 'AVAILABLE', // Todo! remove this status after backend is updated
	bookingIds: undefined,
	activityType: undefined,
};

export const timeSlotColumns = (locale: string): Array<ColumnDef<TimeSlotDto>> => [
	{
		id: 'from',
		accessorKey: 'fromTime',
		header: 'From',
	},
	{
		id: 'to',
		accessorKey: 'untilTime',
		header: 'To',
	},
	{
		accessorKey: 'boat.name',
		header: 'Boat',
	},
	{
		id: 'name',
		accessorKey: 'activityType.name.' + localeToLocalizedStringProperty(locale),
		header: 'Activity Type',
	},
];
