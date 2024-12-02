import React from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import {Button} from '../ui/button';
import {X} from 'lucide-react';
import {useTranslation} from 'react-i18next';

type StlSelectProps<T> = {
	value: string | undefined;
	onValueChange: (value?: string) => void;
	list: T[] | undefined;
	defaultLabel?: string;
	defaultValue?: string;
	getKey: (e?: T) => string | undefined;
	getLabel: (e?: T) => string;
	dataTestId?: string;
};
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const StlSelectDefaultLabelKey: string = 'select';

const StlSelect = <T,>({
	value,
	onValueChange,
	list,
	defaultLabel,
	defaultValue,
	getKey,
	getLabel,
	dataTestId,
}: StlSelectProps<T>) => {
	const {t} = useTranslation();

	const resetValue = () => {
		onValueChange(defaultValue ?? '');
	};

	return (
		<Select value={value} onValueChange={onValueChange}>
			<SelectTrigger
				data-testid={`${dataTestId ?? 'stlSelect'}.triggerDropdown`}>
				<div className="flex justify-between items-center gap-1 w-full">
					<SelectValue
						placeholder={defaultLabel ?? t(StlSelectDefaultLabelKey)}>
						{value
							? getLabel(list?.find((i) => getKey(i) === value))
							: defaultLabel ?? t(StlSelectDefaultLabelKey)}
					</SelectValue>
				</div>
			</SelectTrigger>
			<SelectContent data-testid={`${dataTestId ?? 'stlSelect'}.content`}>
				<Button
					variant="ghost"
					className="flex justify-between items-center h-7 mb-2 w-full opacity-50"
					onClick={resetValue}
					data-testid={`${dataTestId ?? 'stlSelect'}.resetButton`}>
					{t('clearValue')} <X className="h-4 w-4" />
				</Button>
				{list?.map((item) => (
					<SelectItem
						key={getKey(item)}
						value={getKey(item) ?? ''}
						data-testid={`${dataTestId ?? 'stlSelect'}.item.${getKey(item)}`}>
						{getLabel(item)}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default StlSelect;
