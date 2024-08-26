import {ColumnDef} from '@tanstack/react-table';
import {TimeSlotDto} from '../../../models/api/time-slot.model';
import React from 'react';
import {Checkbox} from '../../../components/ui/checkbox';
import {localeToLocalizedStringProperty} from '../../../lib/utils';

export const timeSlotColumns = (
	locale: string,
	setSelectedTimeSlotId: (id: number) => void,
): Array<ColumnDef<TimeSlotDto>> => [
	{
		id: 'select',
		cell: ({row}) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => {
					row.toggleSelected(!!value);
					setSelectedTimeSlotId(row.original.id);
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
		id: 'name',
		accessorKey: 'activityType.name.' + localeToLocalizedStringProperty(locale),
		header: 'Activity Type',
	},
];
