import React from 'react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog';
import {Button} from '../ui/button';

export type StlDialogProps = {
	title: string;
	description: string;
	isOpen: boolean;
	onClose: () => void;
	onSubmit: () => void;
	children: React.ReactNode;
};

const StlDialog: React.FC<StlDialogProps> = ({
	title,
	description,
	isOpen,
	onClose,
	onSubmit,
	children,
}) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md flex flex-col">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div className="flex-grow overflow-auto p-1">{children}</div>
				<DialogFooter className="justify-end items-end">
					<DialogClose asChild>
						<Button type="button" variant="secondary" onClick={onClose}>
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
