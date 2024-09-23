import React from 'react';
import {type ColumnDef} from '@tanstack/react-table';
import {type TimeSlotDto} from '../../../models/api/time-slot.model';
import {Checkbox} from '../../../components/ui/checkbox';
import {getTranslation} from '../../../lib/utils';
import {getDisplayTimeFromBackend} from '../../../lib/date-time.utils';

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
		header: 'From',
		cell: ({row}) => getDisplayTimeFromBackend(row.original.fromTime),
	},
	{
		accessorKey: 'timeSlot.untilTime',
		header: 'Until',
		cell: ({row}) => getDisplayTimeFromBackend(row.original.untilTime),
	},
	{
		accessorKey: 'boat.name',
		header: 'Boat',
	},
	{
		id: 'activityType',
		header: 'Activity Type',
		cell: ({row}) => {
			const activityType = row.original.activityType;

			if (activityType && activityType.name) {
				return getTranslation(locale, activityType.name) ?? 'Unknown Activity';
			}

			return 'No Activity';
		},
	},

	{
		accessorKey: 'Viewer Seats',
		header: 'Viewer Seats',
		cell: ({row}) => {
			return `${row.original.availableViewerSeats ?? 0}/${row.original.seatsViewer}`;
		},
	},
	{
		accessorKey: 'Rider Seats',
		header: 'Rider Seats',
		cell: ({row}) => {
			return `${row.original.availableRiderSeats ?? 0}/${row.original.seatsRider}`;
		},
	},
];
