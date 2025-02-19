import React, { useState } from 'react';
import { getDefaultTimeSlotBasedOnBoat, getDefaultTimeSlotBasedOnPrevious, type TimeSlotDto, TimeSlotType } from '../../../models/api/time-slot.model';
import StlDialog from '../../../components/dialog/stl-dialog';
import TimeSlotForm from '../../../components/forms/time-slot';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../../components/ui/table';
import { type LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { type BoatDto } from '../../../models/api/boat.model';
import EditTimeSlotTableCell from '../../../components/table/edit-time-slot-table-cell';
import { type QueryClient } from '@tanstack/react-query';
import {
	timeslotsForBoatOptions,
	useCreateTimeSlot,
	useDeleteTimeSlot,
	useGetTimeSlotsForBoat,
} from '../../../queries/time-slot';
import { useMutationToaster } from '../../../components/common/mutation-toaster';
import { getDisplayTimeFromBackend } from '../../../lib/date-time.utils';
import {
	extractTypedInfoFromRouteParams,
	getTranslation,
	type RouteParamsLoaderData,
} from '../../../lib/utils';
import { useTranslation } from 'react-i18next';
import { CalendarPlus } from 'lucide-react';

export const loader =
	(queryClient: QueryClient) =>
		async ({ params }: LoaderFunctionArgs) => {
			const routeIds = extractTypedInfoFromRouteParams(params);
			if (!routeIds.eventId) {
				throw new Error('No event ID provided');
			}

			if (!routeIds.boatId) {
				throw new Error('No boat ID provided');
			}

			await queryClient.ensureQueryData(
				timeslotsForBoatOptions(routeIds.eventId, routeIds.boatId),
			);
			return routeIds;
		};

const TimeSlots: React.FC<BoatDto> = (boat: BoatDto) => {
	const { eventId, boatId } = useLoaderData() as RouteParamsLoaderData;

	const { i18n, t } = useTranslation();

	const { data: timeSlots } = useGetTimeSlotsForBoat(eventId, boatId);

	const deleteMutation = useDeleteTimeSlot(eventId, boatId);

	useMutationToaster({ type: 'delete', mutation: deleteMutation });

	return (
		<div>
			<div className="flex flex-wrap justify-between gap-5">
				<h1>{t('timeSlot.title')}</h1>
				<TimeSlotCreateDialog boat={boat} timeSlots={timeSlots} isCreateFromSchedule={false}></TimeSlotCreateDialog>
			</div>

			{/* Wrapper div to enable overflow */}
			<div className="overflow-x-auto my-5 max-w-full">
				<Table className=" min-w-max">
					<TableHeader>
						<TableRow>
							<TableHead>{t('from')}</TableHead>
							<TableHead>{t('to')}</TableHead>
							<TableHead>{t('timeSlot.status')}</TableHead>
							<TableHead>{t('activityType.title')}</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{timeSlots?.length ? (
							timeSlots?.map((slot, index) => (
								<TableRow
									key={index}
									className="w-full justify-between"
									data-testid={`timeslot-row-${index}`}>
									<TableCell data-testid={`timeslot-from-${index}`}>
										{getDisplayTimeFromBackend(slot?.fromTime)}
									</TableCell>
									<TableCell data-testid={`timeslot-to-${index}`}>
										{getDisplayTimeFromBackend(slot?.untilTime)}
									</TableCell>
									<TableCell data-testid={`timeslot-status-${index}`}>
										{slot.status === TimeSlotType.AVAILABLE
											? t('timeSlot.statusAvailable')
											: t('timeSlot.statusBreak')}
									</TableCell>
									<TableCell data-testid={`timeslot-activity-${index}`}>
										{getTranslation(i18n.language, slot.activityType?.name)}
									</TableCell>
									<EditTimeSlotTableCell
										boat={boat}
										timeSlot={slot}
										eventId={eventId}
										deleteMutation={deleteMutation}></EditTimeSlotTableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} className="h-24 text-center">
									{t('timeSlot.noTimeSlotsYet')}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default TimeSlots;

type TimeSlotCreateDialogProps = {
	boat: BoatDto;
	timeSlots?: TimeSlotDto[];
	isCreateFromSchedule: boolean;
};

const TimeSlotCreateDialog: React.FC<TimeSlotCreateDialogProps> = ({ boat, timeSlots, isCreateFromSchedule }) => {
	const { eventId, boatId } = useLoaderData() as RouteParamsLoaderData;

	const { t } = useTranslation();

	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

	const createMutation = useCreateTimeSlot(eventId, boatId);

	const currentDefaultModel = timeSlots === undefined || timeSlots.length === 0
		? getDefaultTimeSlotBasedOnBoat(boat)
		: getDefaultTimeSlotBasedOnPrevious(timeSlots[timeSlots.length - 1], boat);

	const openCreateDialog = () => {
		setIsCreateDialogOpen(true);
	};

	const closeCreateDialog = () => {
		setIsCreateDialogOpen(false);
	};

	return (
		<StlDialog
			title={isCreateFromSchedule ? `${t('timeSlot.create')} - ${boat?.name}` : t('timeSlot.create')}
			description={t('timeSlot.description')}
			triggerLabel={t('timeSlot.triggerLabel')}
			isOpen={isCreateDialogOpen}
			onClose={closeCreateDialog}
			onOpen={openCreateDialog}
			isCard={false}
			isIcon={isCreateFromSchedule}
			icon={<CalendarPlus size={18} className='-mx-2 -my-1' />}
			formId="timeSlot">
			<TimeSlotForm
				model={currentDefaultModel}
				mutation={createMutation}
				boat={boat}
				isCreate={true}
				onSuccessfullySubmitted={closeCreateDialog}
			/>
		</StlDialog>
	);
};

export { TimeSlotCreateDialog };
