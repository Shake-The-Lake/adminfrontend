import React from 'react';
import {useParams} from 'react-router-dom';
import i18n from '../../assets/i18n/i18n';
import {getTranslation} from '../../lib/utils';
import {useGetActivityTypes} from '../../queries/activity-type';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import {type ControllerRenderProps} from 'react-hook-form';
import {FormControl, FormItem, FormLabel, FormMessage} from '../ui/form';

export type ActivityTypeSelectProps = {
	field: ControllerRenderProps<any, 'activityTypeId'>;
};

const ActivityTypeSelect: React.FC<ActivityTypeSelectProps> = ({field}) => {
	const {id} = useParams<{id: string}>();
	const eventId = Number(id);
	const {data: activityTypes} = useGetActivityTypes(eventId);

	return (
		<FormItem>
			<FormLabel>Activity Type</FormLabel>
			<FormControl>
				<Select
					value={field.value ? field.value.toString() : ''}
					onValueChange={(value) => {
						field.onChange(Number(value));
					}}>
					<SelectTrigger>
						<SelectValue placeholder="Select Activity Type">
							{field.value
								? getTranslation(
									i18n.language,
									activityTypes?.find((type) => type.id === field.value)
										?.name,
								)
								: 'Select Activity Type'}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{activityTypes?.map((type) => (
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
