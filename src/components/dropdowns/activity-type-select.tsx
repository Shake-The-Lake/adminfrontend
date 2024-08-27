import React from 'react';
import {useParams} from 'react-router-dom';
import i18n from '../../assets/i18n/i18n';
import {getTranslation} from '../../lib/utils';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import {type ControllerRenderProps} from 'react-hook-form';
import {FormControl, FormItem, FormLabel, FormMessage} from '../ui/form';
import {useGetSearchParameters} from '../../queries/search';

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

	return (
		<FormItem className={className}>
			<FormLabel>Activity Type</FormLabel>
			<FormControl>
				<Select
					value={field.value ? field.value.toString() : ''}
					onValueChange={(value) => {
						field.onChange(Number(value));
					}}>
					<SelectTrigger>
						<SelectValue placeholder="Select">
							{field.value
								? getTranslation(
									i18n.language,
									searchParams?.activityTypes?.find(
										(type) => type.id === field.value,
									)?.name,
								)
								: 'Select'}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{searchParams?.activityTypes?.map((type) => (
							<SelectItem key={type.id} value={type.id.toString()}>
								{getTranslation(i18n.language, type.name)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default ActivityTypeSelect;
