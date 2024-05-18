import React from 'react';
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

export type StlDialogProps = {
	title: string;
	description: string;
	triggerLabel: string;
	onSubmit: () => void;
	children: React.ReactNode;
};

const StlDialog: React.FC<StlDialogProps> = ({
	title,
	description,
	triggerLabel,
	onSubmit,
	children,
}) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full text-center">{triggerLabel}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md flex flex-col">
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
					<Button type="submit" onClick={onSubmit}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default StlDialog;
