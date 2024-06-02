import React, {useEffect, useState} from 'react';
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
	onSubmit?: () => void; // Default submit logic is triggering a form submit
	children: React.ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	onOpen?: () => void;
};

const StlDialog: React.FC<StlDialogProps> = ({
	title,
	description,
	triggerLabel,
	onSubmit,
	children,
	isOpen,
	onClose,
	onOpen,
}) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (isOpen !== undefined) {
			onOpenChange(isOpen);
		}
	}, [isOpen]);

	const onOpenChange = (value: boolean) => {
		if (value) {
			handleOpen();
		} else {
			handleClose();
		}
	};

	const handleClose = () => {
		if (onClose) {
			onClose();
		}

		setOpen(false);
	};

	const handleOpen = () => {
		if (onOpen) {
			onOpen();
		}

		setOpen(true);
	};

	const handleSubmit = () => {
		if (onSubmit) {
			onSubmit();
		} else {
			submitForm();
		}
	};

	const submitForm = () => {
		// Mock form submit event to trigger validation
		document.querySelector('form')?.dispatchEvent(
			new Event('submit', {
				cancelable: true,
				bubbles: true,
			}),
		);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
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
						<Button type="button" variant="secondary" onClick={handleClose}>
							Cancel
						</Button>
					</DialogClose>
					<Button type="submit" onClick={handleSubmit}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default StlDialog;
