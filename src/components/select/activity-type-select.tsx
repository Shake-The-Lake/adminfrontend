import React from 'react';
import {useParams} from 'react-router-dom';
import i18n from '../../assets/i18n/i18n';
import {getTranslation} from '../../lib/utils';
import {type ControllerRenderProps} from 'react-hook-form';
import {FormControl, FormItem, FormLabel, FormMessage} from '../ui/form';
import {useGetSearchParameters} from '../../queries/search';
import {type ActivityTypeDto} from '../../models/api/activity-type.model';
import StlSelect from './stl-select';

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

	const getKey = (a?: ActivityTypeDto | undefined) => a?.id?.toString();
	const getLabel = (a?: ActivityTypeDto | undefined) =>
		getTranslation(i18n.language, a?.name) ?? '';

	return (
		<FormItem className={className}>
			<FormLabel>Activity Type</FormLabel>
			<FormControl>
				<StlSelect
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
					value={field.value?.toString() ?? ''}
					onValueChange={(value?: string) => {
						field.onChange(value);
					}}
					list={searchParams?.activityTypes ?? []}
					getKey={getKey}
					getLabel={getLabel}></StlSelect>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default ActivityTypeSelect;
