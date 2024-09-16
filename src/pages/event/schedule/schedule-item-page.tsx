import {type QueryClient} from '@tanstack/react-query';
import React from 'react';
import {useLoaderData, useParams, type LoaderFunctionArgs} from 'react-router-dom';
import {timeslotDetailOptions, useTimeSlotDetail} from '../../../queries/time-slot';
import {TableHeader, TableRow, TableHead, TableBody, TableCell, Table} from '../../../components/ui/table';
import {EyeIcon, SailboatIcon, TagIcon, UsersIcon} from 'lucide-react';
import {getDisplayTimeFromBackend} from '../../../lib/date-time.utils';
import {useDeleteBooking} from '../../../queries/booking';
import EditBookingTableCell from '../../../components/table/edit-booking';
import LoadingSpinner from '../../../components/animations/loading';
export const loader =
	(queryClient: QueryClient) =>
		async ({params}: LoaderFunctionArgs) => {
			if (!params.timeSlotId) {
				throw new Error('No Timeslot id provided');
			}

			await queryClient.ensureQueryData(
				timeslotDetailOptions(Number(params.timeSlotId)),
			);
			return {timeSlotId: Number(params.timeSlotId)};
		};

const ScheduleItemPage: React.FC = () => {
	const {timeSlotId} = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;

	const {data: timeSlot, isPending, error} = useTimeSlotDetail(timeSlotId);

	const signedUpViewers = timeSlot?.bookings.filter((booking) => !booking.isRider).length;
	const signedUpRiders = timeSlot?.bookings.filter((booking) => booking.isRider).length;

	const {id} = useParams<{id: string}>();
	const eventId = Number(id);

	const deleteMutation = useDeleteBooking(eventId);

	return (
		<>
			<div className="mt-10">
				<LoadingSpinner isLoading={isPending} />
				<h2 className="text-4xl font-bold mb-10">{timeSlot?.boat?.name}, {getDisplayTimeFromBackend(timeSlot?.fromTime)} - {getDisplayTimeFromBackend(timeSlot?.untilTime)}</h2>
				<div className='flex gap-5'>
					<span className='flex gap-2'><SailboatIcon /> {timeSlot?.boat?.operator}</span>
					<span className='flex gap-2'><EyeIcon/>{signedUpViewers} / {timeSlot?.boat?.seatsViewer}</span>
					<span className='flex gap-2'><UsersIcon />{signedUpRiders} / {timeSlot?.boat?.seatsRider}</span>
					<span className='flex gap-2'><TagIcon />{timeSlot?.activityType?.name?.de}</span>
				</div>
				<h2 className='text-2xl mt-10'>Current Booking</h2>
				<Table className="mt-5">
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Manual</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{timeSlot?.bookings.map((slot, index) => (
							<TableRow key={index} className="w-full justify-between">
								<TableCell>{slot.person?.firstName} {slot.person?.lastName}</TableCell>
								<TableCell>{slot.person?.phoneNumber}</TableCell>
								<TableCell>
									{slot.isRider ? 'Ride' : 'View'}
								</TableCell>
								<TableCell>
									{slot.pagerNumber}
								</TableCell>
								<EditBookingTableCell
									booking={slot}
									deleteMutation={deleteMutation}></EditBookingTableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{error && <p>Error fetching Boat.</p>}
			</div>
		</>
	);
};

export default ScheduleItemPage;
