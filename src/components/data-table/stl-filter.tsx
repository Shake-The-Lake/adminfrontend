/* eslint-disable @typescript-eslint/prefer-literal-enum-member */
/* eslint-disable no-bitwise */
import React, {useEffect} from 'react';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import ActivityTypeSelect from '../dropdowns/activity-type-select';
import BoatSelect from '../dropdowns/boat-select';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import {Input} from '../ui/input';
import {type StlFilterParams} from '../../models/api/search.model';
import {validateTime} from '../../lib/date-time.utils';

export enum StlFilterConfig {
	SearchTerm = 1 << 0, // 0001 -- the bitshift is unnecessary, but done for consistency
	ActivityType = 1 << 1, // 0010
	Boat = 1 << 2, // 0100
	From = 1 << 3, // 1000
	To = 1 << 4, // 1 0000
	All = ~(~0 << 5), // 1 1111
}

type StlFilterProps = {
	config: StlFilterConfig;
	params: StlFilterParams;
};

const filterSchema = z.object({
	searchTerm: z.string().optional(),
	activityTypeId: z.number().min(0).optional(),
	boatId: z.number().min(0).optional(),
	from: z.string().refine((value) => validateTime(value), 'Invalid time'),
	to: z.string().refine((value) => validateTime(value), 'Invalid time'),
});

const StlFilter: React.FC<StlFilterProps> = ({config, params}) => {
	const form = useForm<z.infer<typeof filterSchema>>({
		mode: 'onChange',
		defaultValues: params,
		resolver: zodResolver(filterSchema),
	});

	useEffect(() => {
		const subscription = form.watch((value, {name, type}) => {
			if (name === 'searchTerm' && params.onSearchTermChange) {
				params.onSearchTermChange(value.searchTerm);
			} else if (name === 'activityTypeId' && params.onActivityTypeChange) {
				params.onActivityTypeChange(value.activityTypeId);
			} else if (name === 'boatId' && params.onBoatChange) {
				params.onBoatChange(value.boatId);
			} else if (name === 'from' && params.onFromChange) {
				params.onFromChange(value.from);
			} else if (name === 'to' && params.onToChange) {
				params.onToChange(value.to);
			}
		});
		return () => {
			subscription.unsubscribe();
		};
	}, [form.watch]);

	return (
		<Form {...form}>
			<form
				id="filter"
				className="p-1 w-full flex flex-row justify-between gap-4">
				{(config & StlFilterConfig.SearchTerm) ===
					StlFilterConfig.SearchTerm && (
					<FormField
						name="searchTerm"
						control={form.control}
						render={({field}) => (
							<FormItem className={'w-1/4'}>
								<FormLabel>Search</FormLabel>
								<FormControl>
									<Input placeholder="Search..." {...field} className="input" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				{(config & StlFilterConfig.ActivityType) ===
					StlFilterConfig.ActivityType && (
					<Controller
						name="activityTypeId"
						control={form.control}
						render={({field}) => (
							<ActivityTypeSelect field={field} className={'w-1/4'} />
						)}
					/>
				)}
				{(config & StlFilterConfig.Boat) === StlFilterConfig.Boat && (
					<Controller
						name="boatId"
						control={form.control}
						render={({field}) => (
							<BoatSelect field={field} className={'w-1/4'} />
						)}
					/>
				)}
				{(config & StlFilterConfig.From) === StlFilterConfig.From && (
					<FormField
						name="from"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>From</FormLabel>
								<FormControl>
									<Input
										placeholder="Time in HH:MM format"
										{...field}
										className="input"
										type="time"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}></FormField>
				)}
				{(config & StlFilterConfig.To) === StlFilterConfig.To && (
					<FormField
						name="to"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>To</FormLabel>
								<FormControl>
									<Input
										placeholder="Time in HH:MM format"
										{...field}
										className="input"
										type="time"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}></FormField>
				)}
			</form>
		</Form>
	);
};

export default StlFilter;
