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
import {Plus} from 'lucide-react';

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
}) => (
	<Dialog>
		<DialogTrigger asChild>
			<Button
				className="h-40 w-full flex items-center justify-center"
				title={triggerLabel}>
				<Plus className="size-24" />
			</Button>
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

export default StlDialog;
