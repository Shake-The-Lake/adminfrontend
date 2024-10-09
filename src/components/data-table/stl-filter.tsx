/* eslint-disable @typescript-eslint/prefer-literal-enum-member */
/* eslint-disable no-bitwise */
import React, {useEffect} from 'react';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import ActivityTypeSelect from '../select/activity-type-select';
import BoatSelect from '../select/boat-select';
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
import {useTranslation} from 'react-i18next';

export enum StlFilterOptions {
	SearchTerm = 1 << 0, // 0001 -- the bitshift is unnecessary, but done for consistency
	ActivityType = 1 << 1, // 0010
	Boat = 1 << 2, // 0100
	TimeRange = 1 << 3, // 1000
	All = ~(~0 << 4), // 1111
}

type StlFilterProps = {
	options: StlFilterOptions;
	params: StlFilterParams;
};

const filterSchema = z.object({
	searchTerm: z.string().optional(),
	activityTypeId: z.number().min(0).optional(),
	boatId: z.number().min(0).optional(),
	from: z
		.string()
		.optional()
		.refine((value) => validateTime(value), 'Invalid time'),
	to: z
		.string()
		.optional()
		.refine((value) => validateTime(value), 'Invalid time'),
});

const StlFilter: React.FC<StlFilterProps> = ({options, params}) => {
	const form = useForm<z.infer<typeof filterSchema>>({
		mode: 'onChange',
		defaultValues: params,
		resolver: zodResolver(filterSchema),
	});

	const {t} = useTranslation();

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
				className="p-1 w-full flex flex-wrap gap-4 justify-between items-center">
				{(options & StlFilterOptions.SearchTerm) ===
					StlFilterOptions.SearchTerm && (
					<FormField
						name="searchTerm"
						control={form.control}
						render={({field}) => (
							<FormItem className="min-w-[200px] flex-grow">
								<FormLabel>{t('search')}</FormLabel>
								<FormControl>
									<Input placeholder={t('searchPlaceholder')} {...field} className="input" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				{(options & StlFilterOptions.ActivityType) ===
					StlFilterOptions.ActivityType && (
					<Controller
						name="activityTypeId"
						control={form.control}
						render={({field}) => (
							<ActivityTypeSelect
								field={field}
								className="min-w-[200px] flex-grow flex-shrink-0"
							/>
						)}
					/>
				)}
				{(options & StlFilterOptions.Boat) === StlFilterOptions.Boat && (
					<Controller
						name="boatId"
						control={form.control}
						render={({field}) => (
							<BoatSelect
								field={field}
								className="min-w-[200px] flex-grow flex-shrink-0"
							/>
						)}
					/>
				)}
				{(options & StlFilterOptions.TimeRange) ===
					StlFilterOptions.TimeRange && (
					<div className="flex flex-col sm:flex-row sm:items-center min-w-[180px] flex-grow sm:flex-grow-0">
						<FormField
							name="from"
							control={form.control}
							render={({field}) => (
								<FormItem>
									<FormLabel>{t('from')}</FormLabel>
									<FormControl>
										<Input
											placeholder={t('timeSlot.timeFormat')}
											{...field}
											className="input"
											type="time"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="to"
							control={form.control}
							render={({field}) => (
								<FormItem className="sm:ml-4">
									<FormLabel>To</FormLabel>
									<FormControl>
										<Input
											placeholder={t('timeSlot.timeFormat')}
											{...field}
											className="input"
											type="time"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				)}
			</form>
		</Form>
	);
};

export default StlFilter;
