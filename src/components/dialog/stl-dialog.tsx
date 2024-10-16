import React, {useEffect, useRef, useState} from 'react';
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
import {PencilIcon, Plus} from 'lucide-react';
import {useTranslation} from 'react-i18next';

export type StlDialogProps = {
	title: string;
	description: string;
	triggerLabel: string;
	children: React.ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	onOpen?: () => void;
	isCard?: boolean;
	isIcon?: boolean;
	formId?: string;
};

const StlDialog: React.FC<StlDialogProps> = ({
	title,
	description,
	triggerLabel,
	children,
	isOpen,
	onClose,
	onOpen,
	isCard = true,
	isIcon = false,
	formId,
}) => {
	const dialogContentRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	const {t} = useTranslation();

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

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				{isCard ? (
					<Button
						className="h-40  mb-5 w-full flex items-center justify-center"
						title={triggerLabel}>
						<Plus className="size-24" />
					</Button>
				) : isIcon ? (
					<Button type="button" title={triggerLabel} variant="ghost">
						<PencilIcon></PencilIcon>
					</Button>
				) : (
					<Button type="button" title={triggerLabel}>
						{triggerLabel}
					</Button>
				)}
			</DialogTrigger>
			<DialogContent ref={dialogContentRef} className="flex flex-col">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div className="flex-grow overflow-auto p-1">{children}</div>
				<DialogFooter className="justify-end items-end">
					<DialogClose asChild>
						<Button
							type="button"
							variant="secondary"
							className="max-sm:mt-2"
							onClick={handleClose}>
							{t('cancel')}
						</Button>
					</DialogClose>
					{formId && (
						<Button type="submit" form={formId}>
							{t('save')}
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default StlDialog;
