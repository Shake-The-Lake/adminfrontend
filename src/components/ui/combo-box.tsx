import React from 'react';
import {
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	Command,
} from './command';
import {ChevronDown, Check} from 'lucide-react';
import {cn} from '../../lib/utils';
import {Button} from './button';
import {FormControl} from './form';
import {Popover, PopoverTrigger, PopoverContent} from './popover';

type ComboBoxProps<T> = {
	value: T | undefined;
	onValueChange: (value?: T) => void;
	list: T[] | undefined;
	getLabel: (e?: T) => string;
	getKey: (e?: T) => string | number | undefined;
};

// eslint-disable-next-line @typescript-eslint/comma-dangle
const ComboBox = <T,>({
	value,
	list,
	getLabel,
	getKey,
	onValueChange,
}: ComboBoxProps<T>) => {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						variant="outline"
						role="combobox"
						className={cn(
							'w-full justify-between',
							!value && 'text-muted-foreground',
						)}>
						{value && list
							? getLabel(list.find((l) => getKey(l) === value))
							: 'Select'}
						<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandEmpty>No entry found.</CommandEmpty>
						<CommandGroup>
							{list?.map((l) => (
								<CommandItem
									value={getLabel(l)}
									key={getKey(l)}
									onSelect={() => {
										onValueChange(l);
									}}>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											getKey(l) === getKey(value) ? 'opacity-100' : 'opacity-0',
										)}
									/>
									{getLabel(l)}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default ComboBox;
