import React, { useEffect, useRef, useState } from 'react';
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
import { Button } from '../ui/button';
import { TimerResetIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { type MoveTimeSlotDto, type TimeSlotDto } from '../../models/api/time-slot.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { validateTime, getDisplayTimeFromBackend } from '../../lib/date-time.utils';
import { onInvalidFormHandler } from '../../lib/utils';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useMoveTimeSlot } from '../../queries/time-slot';
import { useMutationToaster } from '../common/mutation-toaster';

const TimeSlotMoveSchema = z.object({
	fromTime: z.string().refine((value) => validateTime(value), 'Invalid time'),
	untilTime: z.string().refine((value) => validateTime(value), 'Invalid time'),
});

export type TimeSlotMoveFormSchema = z.infer<typeof TimeSlotMoveSchema>;

const TimeSlotMoveDialog: React.FC<TimeSlotDto> = (dto) => {
	const { id, boatId } = useParams<{ id: string; boatId: string }>();

	const form = useForm<TimeSlotMoveFormSchema>({
		mode: 'onChange',
		defaultValues: dto, // Todo! from/until does not get updated correctly
		resolver: zodResolver(TimeSlotMoveSchema),
	});

	const dialogContentRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);

	const moveMutation = useMoveTimeSlot(Number(id), Number(boatId), dto?.id);
	useMutationToaster({ type: 'update', mutation: moveMutation });

	useEffect(() => {
		// Ensure times get reset if not saved or if updates externally
		form.setValue('fromTime', dto.fromTime ?? '', { shouldTouch: false });
		form.setValue('untilTime', dto.untilTime ?? '', { shouldTouch: false });
	}, [dto.id, dto.fromTime, dto.untilTime, open]);

	const onOpenChange = (value: boolean) => {
		if (value) {
			handleOpen();
		} else {
			handleClose();
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};


	const onSubmit: SubmitHandler<TimeSlotMoveFormSchema> = async (values) => {
		const timeSlot: MoveTimeSlotDto = { ...values }; // Todo! move from time too
		// todo! better handle flow, bc right now we can't shorten / lengthen

		await moveMutation.mutateAsync(timeSlot);

		handleClose();
	};

	// Todo! fix all translations, including originl time everywhere

	return (
		<Dialog open={open} onOpenChange={onOpenChange} data-testid="dialog">
			<DialogTrigger asChild>
				<Button
					type="button"
					title={t('timeSlot.moveTimeSlot')}
					variant="ghost"
					onClick={handleOpen}
					data-testid="dialog-trigger-icon-button">
					<TimerResetIcon />
				</Button>
			</DialogTrigger>
			<DialogContent
				ref={dialogContentRef}
				className="flex flex-col"
				onInteractOutside={(e) => {
					// We assume a click on the backdrop is an accident and
					// the user does not want to lose data, therefore disallow closing
					e.preventDefault();
				}}
				data-testid="dialog-content">
				<DialogHeader>
					<DialogTitle>{t('timeSlot.moveTimeSlot')}</DialogTitle>
					<DialogDescription>{'timeSlot.moveTimeSlotDescription'}</DialogDescription>
				</DialogHeader>
				<div className="flex-grow overflow-auto p-1">
					<Form {...form}>
						<form
							id="moveTimeSlot"
							role="form"
							className="p-1 space-y-4 w-full"
							onSubmit={form.handleSubmit(onSubmit, onInvalidFormHandler)}>
							<FormField
								name="fromTime"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('from')}</FormLabel>
										<FormControl>
											<Input
												placeholder={t('timeSlot.timeFormat')}
												{...field}
												className="input"
												type="time"
											/>
										</FormControl>
										{dto.fromTime && <FormDescription>
											original time: {getDisplayTimeFromBackend(dto.fromTime)}
										</FormDescription>}
										<FormMessage />
									</FormItem>
								)}></FormField>
							<FormField
								name="untilTime"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('to')}</FormLabel>
										<FormControl>
											<Input
												placeholder={t('timeSlot.timeFormat')}
												{...field}
												className="input"
												type="time"
											/>
										</FormControl>
										{dto.untilTime && <FormDescription>
											original time: {getDisplayTimeFromBackend(dto.untilTime)}
										</FormDescription>}
										<FormMessage />
									</FormItem>
								)}></FormField>
						</form>
					</Form>
				</div>
				<DialogFooter className="justify-end items-end">
					<DialogClose asChild>
						<Button
							type="button"
							variant="secondary"
							className="max-sm:mt-2"
							onClick={handleClose}
							data-testid="dialog-close-button">
							{t('cancel')}
						</Button>
					</DialogClose>
					<Button
						type="submit"
						form="moveTimeSlot"
						data-testid="dialog-submit-button">
						{t('move')}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default TimeSlotMoveDialog;
