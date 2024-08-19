/* eslint-disable @typescript-eslint/prefer-literal-enum-member */
/* eslint-disable no-bitwise */
import React from 'react';
import {Form, useParams} from 'react-router-dom';
import {type ActivityTypeDto} from '../../models/api/activity-type.model';
import {type BoatDto} from '../../models/api/boat.model';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import ActivityTypeSelect from '../dropdowns/activity-type-select';
import {validateTime} from '../../lib/utils';
import BoatSelect from '../dropdowns/boat-select';

export type StlSearchParams = {
	searchTerm?: string;
	activityType?: ActivityTypeDto; // Todo! remove
	activityTypeId?: number;
	boat?: BoatDto;
	boatId?: number;
	from?: string; // In HH:mm format
	to?: string; // In HH:mm format
};

export enum StlSearchConfigValues {
	StringSearch = 0,
	ActivityType = 1 << 0, // 0001 -- the bitshift is unnecessary, but done for consistency
	Boat = 1 << 1, // 0010
	From = 1 << 2, // 0100
	To = 1 << 3, // 1000
	All = ~(~0 << 4), // 1111
}

type StlFilterProps = {
	config: StlSearchConfigValues;
};

const FilterSchema = z.object({
	searchTerm: z.string().optional(),
	activityTypeId: z.number().min(0).optional(),
	boatId: z.string().min(0).optional(),
	from: z.string().refine((value) => validateTime(value), 'Invalid time'),
	until: z.string().refine((value) => validateTime(value), 'Invalid time'),
});

const StlFilter: React.FC<StlFilterProps> = ({config}) => {
	const {id} = useParams<{id: string}>();
	const eventId = Number(id);

	const form = useForm<z.infer<typeof FilterSchema>>({
		mode: 'onChange',
		resolver: zodResolver(FilterSchema),
	});

	return (
		<Form {...form}>
			<form id="filter" className="p-1 space-y-4 w-full">
				{(config & StlSearchConfigValues.ActivityType) ===
					StlSearchConfigValues.ActivityType && (
					<Controller
						name="activityTypeId"
						control={form.control}
						render={({field}) => <ActivityTypeSelect field={field} />}
					/>
				)}
				{(config & StlSearchConfigValues.Boat) ===
					StlSearchConfigValues.Boat && (
					<Controller
						name="boatId"
						control={form.control}
						render={({field}) => <BoatSelect field={field} />}
					/>
				)}
			</form>
		</Form>
	);
};

export default StlFilter;
