import React, {useState} from 'react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import {Button} from '../ui/button';
import {Plus} from 'lucide-react';

export type StlDialogProps = {
	title: string;
	description: string;
	triggerLabel: string;
	onSubmit: () => boolean | void; // If returns true, close afterwards
	children: React.ReactNode;
};

const StlDialog: React.FC<StlDialogProps> = ({
	title,
	description,
	triggerLabel,
	onSubmit,
	children,
}) => {
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		const shouldClose = onSubmit();

		if (shouldClose) {
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className="h-40 w-full flex items-center justify-center"
					title={triggerLabel}>
					<Plus className="size-24" />
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div className="flex-grow overflow-auto p-1">{children}</div>
				<DialogFooter className="justify-end items-end">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Cancel
						</Button>
					</DialogClose>
					<Button type="submit" onClick={handleClick}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default StlDialog;
