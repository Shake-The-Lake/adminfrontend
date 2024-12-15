import React, { useEffect, useRef, useState } from 'react';
import { Trash } from 'lucide-react';
import { type MoveTimeSlotDto, type TimeSlotDto } from '../../models/api/time-slot.model';
import { TableCell } from '../ui/table';
import StlDialog from '../dialog/stl-dialog';
import TimeSlotForm from '../forms/time-slot';
import { type BoatDto } from '../../models/api/boat.model';
import { Button } from '../ui/button';
import { type UseMutationResult } from '@tanstack/react-query';
import { useUpdateTimeSlot } from '../../queries/time-slot';
import { useTranslation } from 'react-i18next';
import ActivityTraceInfo from '../common/ActivityTraceInfo';
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
import { TimerResetIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { validateTime, getDisplayTimeFromBackend, fromTimeToDateTime, toSwissLocaleTimeString } from '../../lib/date-time.utils';
import { onInvalidFormHandler } from '../../lib/utils';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useMoveTimeSlot } from '../../queries/time-slot';
import { useMutationToaster } from '../common/mutation-toaster';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useEventDetail } from '../../queries/event';

type EditTimeSlotTableCellProps = {
	timeSlot: TimeSlotDto;
	boat: BoatDto;
	eventId: number;
	deleteMutation: UseMutationResult<any, Error, number>; // First any is return type, second is input
};

const EditTimeSlotTableCell: React.FC<EditTimeSlotTableCellProps> = ({
	timeSlot,
	boat,
	eventId,
	deleteMutation,
}) => {
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
	const { t } = useTranslation();
	const updateMutation = useUpdateTimeSlot(eventId, timeSlot?.id);
	const handleDelete = async () => deleteMutation.mutateAsync(timeSlot?.id);

	const openUpdateDialog = () => {
		setIsUpdateDialogOpen(true);
	};

	const closeUpdateDialog = () => {
		setIsUpdateDialogOpen(false);
	};

	return (
		<TableCell className="text-right">
			<TimeSlotMoveDialog key={`move-${timeSlot.id}`} {...timeSlot}></TimeSlotMoveDialog>
			<StlDialog
				key={`update-${timeSlot.id}`}
				title={t('timeSlot.edit')}
				description={t('timeSlot.editDescription')}
				triggerLabel={t('timeSlot.edit')}
				isOpen={isUpdateDialogOpen}
				onClose={closeUpdateDialog}
				onOpen={openUpdateDialog}
				isCard={false}
				isIcon={true}
				formId="timeSlot">
				<ActivityTraceInfo
					{...timeSlot}
				/>
				<TimeSlotForm
					model={timeSlot}
					mutation={updateMutation}
					isCreate={false}
					boat={boat}
					onSuccessfullySubmitted={closeUpdateDialog}
				/>
			</StlDialog>
			<Button
				variant="ghost"
				size="icon"
				className="items-center"
				onClick={handleDelete}
				aria-label="Delete Time Slot">
				<Trash className="cursor-pointer hover:text-red-600" />
			</Button>
		</TableCell >
	);
};

export default EditTimeSlotTableCell;

const TimeSlotMoveSchema = z.object({
	fromTime: z.string().refine((value) => validateTime(value), 'Invalid time'),
	untilTime: z.string().refine((value) => validateTime(value), 'Invalid time'),
});

export type TimeSlotMoveFormSchema = z.infer<typeof TimeSlotMoveSchema>;

const TimeSlotMoveDialog: React.FC<TimeSlotDto> = (dto) => {
	const { id, boatId } = useParams<{ id: string; boatId: string }>();
	const eventId = Number(id);
	const { data: event } = useEventDetail(eventId, false);

	const form = useForm<TimeSlotMoveFormSchema>({
		mode: 'onChange',
		defaultValues: dto,
		resolver: zodResolver(TimeSlotMoveSchema),
	});

	const dialogContentRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);

	const moveMutation = useMoveTimeSlot(eventId, Number(boatId), dto?.id);
	useMutationToaster({ type: 'update', mutation: moveMutation });

	useEffect(() => {
		// Ensure times get reset if not saved or if updates externally
		form.setValue('fromTime', dto.fromTime ?? '', { shouldTouch: false });
		form.setValue('untilTime', dto.untilTime ?? '', { shouldTouch: false });
	}, [dto.id, dto.fromTime, dto.untilTime, open]);

	const [isTimeSlotInFuture, setIsTimeSlotInFuture] = useState(false); // Todo! for these, add texts to explain
	const [isTimeSlotRunning, setIsTimeSlotRunning] = useState(false);
	const [isTimeSlotOver, setIsTimeSlotOver] = useState(false);

	useEffect(() => {
		if (event !== undefined) {
			const now = new Date();
			const timeSlotFrom = fromTimeToDateTime(event.date, dto.fromTime ?? '00:00');
			const timeSlotUntil = fromTimeToDateTime(event.date, dto.untilTime ?? '23:59');

			// Zukünftige Sessions: Können verschoben, verlängert oder verkürzt werden. Verschiebungen wirken sich auf alle darauffolgenden Sessions aus.
			setIsTimeSlotInFuture(timeSlotFrom > now);

			// Laufende Sessions: Können verlängert oder verkürzt werden, aber *nicht* verschoben.
			setIsTimeSlotRunning(timeSlotFrom <= now && timeSlotUntil >= now);

			// Bereits abgeschlossene Sessions: Bleiben unverändert.
			setIsTimeSlotOver(timeSlotUntil < now);
		}

	}, [event?.date, toSwissLocaleTimeString(new Date())]);

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
		const timeSlot: MoveTimeSlotDto = { ...values };
		await moveMutation.mutateAsync(timeSlot);

		handleClose();
	};

	if (isTimeSlotOver) {
		return <></>;
	}

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
					<DialogDescription className='whitespace-pre text-wrap'>
						{t('timeSlot.moveTimeSlotDescription')}
					</DialogDescription>
				</DialogHeader>
				<div className="flex-grow overflow-auto p-1">
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1">
							<AccordionTrigger className='text-sm'>{t('timeSlot.moveTimeSlotInfo')}</AccordionTrigger>
							<AccordionContent className='whitespace-pre text-wrap'>{t('timeSlot.moveTimeSlotInfoDescription')}</AccordionContent>
						</AccordionItem>
					</Accordion>

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
												disabled={isTimeSlotRunning}
											/>
										</FormControl>
										{dto.fromTime && <FormDescription>
											{isTimeSlotRunning ? t('timeSlot.moveTimeSlotIsRunning') : (`${t('timeSlot.unchangedTime')}: ${getDisplayTimeFromBackend(dto.fromTime)}`)}
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
											{t('timeSlot.unchangedTime')}: {getDisplayTimeFromBackend(dto.untilTime)}
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
						{t('timeSlot.move')}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
