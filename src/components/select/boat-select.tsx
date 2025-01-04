import React from 'react';

import { useParams } from 'react-router-dom';
import { type ControllerRenderProps } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useGetSearchParameters } from '../../queries/search';
import StlSelect, { StlSelectDefaultLabelKey } from './stl-select';
import { type BoatDto } from '../../models/api/boat.model';
import { useTranslation } from 'react-i18next';

export type BoatSelectProps = {
	field: ControllerRenderProps<any, 'boatId'>;
	className?: string | undefined;
};

const BoatSelect: React.FC<BoatSelectProps> = ({ field, className }) => {
	const { id } = useParams<{ id: string }>();
	const eventId = Number(id);
	const { data: searchParams } = useGetSearchParameters(eventId);

	const { t } = useTranslation();

	const getKey = (b?: BoatDto | undefined) => b?.id?.toString();
	const getLabel = (b?: BoatDto | undefined) =>
		b?.name ?? t(StlSelectDefaultLabelKey);

	return (
		<FormItem className={className}>
			<FormLabel htmlFor={field.name}>{t('boat.title')}</FormLabel>
			<FormControl>
				<StlSelect
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
					value={field.value?.toString() ?? ''}
					onValueChange={(value?: string) => {
						// React-hook-form does not support undefined as a value, therefore need to "hack" this
						field.onChange(value === '' ? '' : Number(value));
					}}
					list={searchParams?.boats}
					getKey={getKey}
					getLabel={getLabel}></StlSelect>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default BoatSelect;
