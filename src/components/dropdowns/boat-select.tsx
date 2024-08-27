import React from 'react';

import {useParams} from 'react-router-dom';
import {useGetBoats} from '../../queries/boat';
import {type ControllerRenderProps} from 'react-hook-form';
import {FormControl, FormItem, FormLabel, FormMessage} from '../ui/form';
import ComboBox from '../ui/combo-box';
import {type BoatDto} from '../../models/api/boat.model';

export type BoatSelectProps = {
	field: ControllerRenderProps<any, 'boatId'>;
	className?: string | undefined;
};

const BoatSelect: React.FC<BoatSelectProps> = ({field, className}) => {
	const {id} = useParams<{id: string}>();
	const eventId = Number(id);
	const {data: boats} = useGetBoats(eventId);

	const getLabel = (b?: BoatDto | undefined) => b?.name ?? '';
	const getKey = (b?: BoatDto | undefined) => b?.id;

	return (
		<FormItem className={className}>
			<FormLabel>Boat</FormLabel>
			<FormControl>
				<ComboBox
					value={field.value}
					onValueChange={(value?: BoatDto) => {
						field.onChange(value?.id);
					}}
					list={boats ?? []}
					getLabel={getLabel}
					getKey={getKey}></ComboBox>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default BoatSelect;
