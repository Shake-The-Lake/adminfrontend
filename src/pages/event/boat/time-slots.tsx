import React, {useState} from 'react';
import {defaultTimeSlot} from '../../../models/api/time-slot.model';
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
import {type LoaderFunctionArgs, useLoaderData} from 'react-router-dom';
import {type BoatDto} from '../../../models/api/boat.model';
import EditTimeSlotTableCell from '../../../components/table/edit-time-slot-table-cell';
import {type QueryClient} from '@tanstack/react-query';
import {
	timeslotsForBoatOptions,
	useCreateTimeSlot,
	useDeleteTimeSlot,
	useGetTimeSlotsForBoat,
} from '../../../queries/time-slot';
import LoadingSpinner from '../../../components/animations/loading';
import {MutationToaster} from '../../../components/common/mutation-toaster';
import {getDisplayTimeFromBackend} from '../../../lib/date-time.utils';
import {extractTypedInfoFromRouteParams} from '../../../lib/utils';

export const loader =
	(queryClient: QueryClient) =>
		async ({params}: LoaderFunctionArgs) => {
			const routeIds = extractTypedInfoFromRouteParams(params);
			if (!routeIds.eventId) {
				throw new Error('No event ID provided');
			}

			if (!routeIds.boatId) {
				throw new Error('No boat ID provided');
			}

			await queryClient.ensureQueryData(
				timeslotsForBoatOptions(routeIds.eventId, routeIds.boatId, queryClient),
			);
			return routeIds;
		};

const TimeSlots: React.FC<BoatDto> = (boat: BoatDto) => {
	const {eventId, boatId} = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;
	const {data: timeSlots, isPending} = useGetTimeSlotsForBoat(eventId, boatId);
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

	const createMutation = useCreateTimeSlot(boatId, eventId);
	const deleteMutation = useDeleteTimeSlot(boatId, eventId);

	const openCreateDialog = () => {
		setIsCreateDialogOpen(true);
	};

	const closeCreateDialog = () => {
		setIsCreateDialogOpen(false);
	};

	return (
		<div>
			<LoadingSpinner
				isLoading={
					isPending || deleteMutation.isPending || createMutation.isPending
				}
			/>
			<MutationToaster type="delete" mutation={deleteMutation} />

			<div className="flex justify-between">
				<>
					<h1>Time Slots</h1>
					<StlDialog
						title="Add Time Slot"
						description="Add time slots to the boat"
						triggerLabel="Add time slot"
						isOpen={isCreateDialogOpen}
						onClose={closeCreateDialog}
						onOpen={openCreateDialog}
						isCard={false}
						formId="timeSlot">
						<TimeSlotForm
							model={{...defaultTimeSlot, boatId: boat.id}}
							mutation={createMutation}
							boat={boat}
							isCreate={true}
							onSuccessfullySubmitted={closeCreateDialog}
						/>
					</StlDialog>
				</>
			</div>
			<Table className="mt-5">
				<TableHeader>
					<TableRow>
						<TableHead>From</TableHead>
						<TableHead>To</TableHead>
						<TableHead>Type</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{timeSlots?.map((slot, index) => (
						<TableRow key={index} className="w-full justify-between">
							<TableCell>{getDisplayTimeFromBackend(slot?.fromTime)}</TableCell>
							<TableCell>
								{getDisplayTimeFromBackend(slot?.untilTime)}
							</TableCell>
							<TableCell>
								{slot.status === 'AVAILABLE' ? 'ride' : 'break'}
							</TableCell>
							<EditTimeSlotTableCell
								boat={boat}
								timeSlot={slot}
								deleteMutation={deleteMutation}></EditTimeSlotTableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default TimeSlots;
