import React from 'react';
import {useParams} from 'react-router-dom';
import {getTranslation} from '../../lib/utils';
import {type ControllerRenderProps} from 'react-hook-form';
import {FormControl, FormItem, FormLabel, FormMessage} from '../ui/form';
import {useGetSearchParameters} from '../../queries/search';
import {type ActivityTypeDto} from '../../models/api/activity-type.model';
import StlSelect, {StlSelectDefaultLabelKey} from './stl-select';
import {useTranslation} from 'react-i18next';

export type ActivityTypeSelectProps = {
	field: ControllerRenderProps<any, 'activityTypeId'>;
	className?: string | undefined;
};

const ActivityTypeSelect: React.FC<ActivityTypeSelectProps> = ({
	field,
	className,
}) => {
	const {id} = useParams<{id: string}>();
	const eventId = Number(id);
	const {data: searchParams} = useGetSearchParameters(eventId);

	const {i18n, t} = useTranslation();

	const getKey = (a?: ActivityTypeDto | undefined) => a?.id?.toString();
	const getLabel = (a?: ActivityTypeDto | undefined) =>
		getTranslation(i18n.language, a?.name) ?? t(StlSelectDefaultLabelKey);

	return (
		<FormItem className={className}>
			<FormLabel htmlFor={field.name}>Activity Type</FormLabel>
			<FormControl>
				<StlSelect
					value={field.value?.toString() ?? ''}
					onValueChange={(value?: string) => {
						field.onChange(value === '' ? '' : Number(value));
					}}
					list={searchParams?.activityTypes ?? []}
					getKey={getKey}
					getLabel={getLabel}
				/>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default ActivityTypeSelect;
