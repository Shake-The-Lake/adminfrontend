import {type ColumnDef} from '@tanstack/react-table';
import {type TimeSlotDto} from '../../../models/api/time-slot.model';
import React from 'react';
import {Checkbox} from '../../../components/ui/checkbox';
import {localeToLocalizedStringProperty} from '../../../lib/utils';

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
		id: 'activityType',
		header: 'Activity Type',
		cell: ({row}) => {
			const activityType = row.original.activityType;
			const localizedStringKey = localeToLocalizedStringProperty(locale);

			if (activityType && activityType.name) {
				return activityType.name[localizedStringKey] || 'Unknown Activity';
			}

			return 'No Activity';
		},
	},

	{
		accessorKey: 'Viewer Seats',
		header: 'Viewer Seats',
		cell: ({row}) => {
			return `${row.original.availableViewerSeats}/${row.original.seatsViewer}`;
		},
	},
	{
		accessorKey: 'Rider Seats',
		header: 'Rider Seats',
		cell: ({row}) => {
			return `${row.original.availableRiderSeats}/${row.original.seatsRider}`;
		},
	},
];
