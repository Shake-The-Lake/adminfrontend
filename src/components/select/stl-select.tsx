import React from 'react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type StlSelectProps<T> = {
	value: string | undefined;
	onValueChange: (value?: string) => void;
	list: T[] | undefined;
	defaultLabel?: string;
	defaultValue?: string;
	getKey: (e?: T) => string | undefined;
	getLabel: (e?: T) => string;
};

export const StlSelectDefaultLabelKey = 'select';

// eslint-disable-next-line @typescript-eslint/comma-dangle
const StlSelect = <T,>({
	value,
	onValueChange,
	list,
	defaultLabel,
	defaultValue,
	getKey,
	getLabel,
}: StlSelectProps<T>) => {
	const {t} = useTranslation();

	const resetValue = () => {
		onValueChange(defaultValue ?? '');
	};

	return (
		<Select value={value} onValueChange={onValueChange}>
			<SelectTrigger>
				<div className="flex justify-between items-center gap-1 w-full">
					<SelectValue
						placeholder={defaultLabel ?? t(StlSelectDefaultLabelKey)}>
						{value
							? getLabel(list?.find((i) => getKey(i) === value))
							: defaultLabel ?? t(StlSelectDefaultLabelKey)}
					</SelectValue>
				</div>
			</SelectTrigger>
			<SelectContent>
				<Button
					variant="ghost"
					className="flex justify-between items-center h-7 mb-2 w-full opacity-50"
					onClick={resetValue}
					data-testid="reset-button">
					{t('clearValue')} <X className="h-4 w-4" />
				</Button>
				{list?.map((item) => (
					<SelectItem key={getKey(item)} value={getKey(item) ?? ''}>
						{getLabel(item)}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default StlSelect;
