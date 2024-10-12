import React from 'react';
import {type ColumnDef} from '@tanstack/react-table';
import {type TimeSlotDto} from '../../../models/api/time-slot.model';
import {Checkbox} from '../../../components/ui/checkbox';
import {getTranslation} from '../../../lib/utils';
import {getDisplayTimeFromBackend} from '../../../lib/date-time.utils';
import {t} from 'i18next';

export const timeSlotColumns = (
	locale: string,
	setSelectedTimeSlotId: (id: number) => void,
	selectedTimeSlotId: number | undefined,
): Array<ColumnDef<TimeSlotDto>> => [
	{
		id: 'select',
		cell: ({row}) => (
			<Checkbox
				checked={row.original.id === selectedTimeSlotId}
				onCheckedChange={(value) => {
					if (value) {
						setSelectedTimeSlotId(row.original.id);
					}
				}}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'timeSlot.fromTime',
		header: t('from'),
		cell: ({row}) => getDisplayTimeFromBackend(row.original.fromTime),
	},
	{
		accessorKey: 'timeSlot.untilTime',
		header: t('to'),
		cell: ({row}) => getDisplayTimeFromBackend(row.original.untilTime),
	},
	{
		accessorKey: 'boat.name',
		header: t('boat.title'),
	},
	{
		id: 'activityType',
		header: t('activity'),
		cell({row}) {
			const {activityType} = row.original;

			if (activityType?.name) {
				return getTranslation(locale, activityType.name) ?? 'Unknown Activity';
			}

			return 'No Activity';
		},
	},

	{
		accessorKey: 'Viewer Seats',
		header: t('booking.viewerSeats'),
		cell({row}) {
			return `${row.original.availableViewerSeats ?? 0}/${row.original.seatsViewer}`;
		},
	},
	{
		accessorKey: 'Rider Seats',
		header: t('booking.riderSeats'),
		cell({row}) {
			return `${row.original.availableRiderSeats ?? 0}/${row.original.seatsRider}`;
		},
	},
];
