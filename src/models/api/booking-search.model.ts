import { type TimeSlotDto } from './time-slot.model';
import { type ColumnDef } from '@tanstack/react-table';
import { type PersonDto } from './person.model';
import { type BoatDto } from './boat.model';
import { type ActivityTypeDto } from './activity-type.model';
import { getDisplayTimeFromBackend } from '../../lib/date-time.utils';
import { t } from 'i18next';
import { type BookingDto } from './booking.model';

export type BookingSearchDto = {
	person: PersonDto;
	boat: BoatDto;
	timeSlot: TimeSlotDto;
	activityType: ActivityTypeDto;
	booking: BookingDto;
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
		header: t('firstName'),
	},
	{
		accessorKey: 'person.lastName',
		header: t('lastName'),
	},
	{
		accessorKey: 'timeSlot.fromTime',
		header: t('from'),
		cell: ({ row }) => getDisplayTimeFromBackend(row.original.timeSlot.fromTime),
	},
	{
		accessorKey: 'timeSlot.untilTime',
		header: t('to'),
		cell: ({ row }) => getDisplayTimeFromBackend(row.original.timeSlot.untilTime),
	},
	{
		accessorKey: 'activityType.name.de',
		header: t('activity'),
	},
	{
		accessorKey: 'boat.name',
		header: t('boat.title'),
	},
	{
		accessorKey: 'person.emailAddress',
		header: t('email'),
	},
	{
		accessorKey: 'person.phoneNumber',
		header: t('phone'),
	},
	{
		accessorKey: 'booking.createdBy',
		header: t('createdBy'),
	},
	{
		accessorKey: 'booking.updatedBy',
		header: t('modifiedBy'),
	},
];
