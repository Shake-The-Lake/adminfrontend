import React from 'react';

import {FormControl, FormItem, FormLabel, FormMessage} from '../ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import {Button} from '../ui/button';
import {X} from 'lucide-react';

type StlSelectProps<T> = {
	value: string | undefined;
	onValueChange: (value?: string) => void;
	list: T[] | undefined;
	getKey: (e?: T) => string | undefined;
	getLabel: (e?: T) => string;
};

// eslint-disable-next-line @typescript-eslint/comma-dangle
const StlSelect = <T,>({
	value,
	onValueChange,
	list,
	getKey,
	getLabel,
}: StlSelectProps<T>) => {
	const resetValue = () => {
		console.log('get here');
		onValueChange(undefined);
	};

	return (
		<Select value={value} onValueChange={onValueChange}>
			<SelectTrigger>
				<div className="flex justify-between items-center gap-1 w-full">
					<SelectValue placeholder="Select">
						{value
							? getLabel(list?.find((i) => getKey(i) === value))
							: 'Select'}
					</SelectValue>
				</div>
			</SelectTrigger>
			<SelectContent>
				<Button
					variant="ghost"
					className="flex justify-between items-center h-7 mb-2 w-full opacity-50"
					onClick={resetValue}>
					Clear Selected Value <X className="h-4 w-4" />
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
