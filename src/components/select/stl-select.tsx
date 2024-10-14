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
	getKey: (e?: T) => string | undefined;
	getLabel: (e?: T) => string;
};

export const StlSelectDefaultLabel = 'Select';

// eslint-disable-next-line @typescript-eslint/comma-dangle
const StlSelect = <T,>({
	value,
	onValueChange,
	list,
	defaultLabel,
	getKey,
	getLabel,
}: StlSelectProps<T>) => {
	const resetValue = () => {
		onValueChange('');
	};

	const { t } = useTranslation();
	return (
		<Select value={value} onValueChange={onValueChange} >
			<SelectTrigger>
				<div className="flex justify-between items-center gap-1 w-full">
					<SelectValue placeholder={defaultLabel ?? StlSelectDefaultLabel}>
						{value
							? getLabel(list?.find((i) => getKey(i) === value))
							: defaultLabel ?? StlSelectDefaultLabel}
					</SelectValue>
				</div>
			</SelectTrigger>
			<SelectContent>
				<Button
					variant="ghost"
					className="flex justify-between items-center h-7 mb-2 w-full opacity-50"
					onClick={resetValue}>
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
