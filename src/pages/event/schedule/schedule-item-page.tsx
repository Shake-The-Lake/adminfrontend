import {type QueryClient} from '@tanstack/react-query';
import React from 'react';
import {useLoaderData, useParams, type LoaderFunctionArgs} from 'react-router-dom';
import {timeslotDetailOptions} from '../../../queries/time-slot';
import {TableHeader, TableRow, TableHead, TableBody, TableCell, Table} from '../../../components/ui/table';
import {TagIcon, UserIcon, UsersIcon, ViewIcon} from 'lucide-react';
import {getDisplayTimeFromBackend} from '../../../lib/date-time.utils';
import {type TimeSlotDto} from '../../../models/api/time-slot.model';
import {useDeleteBooking} from '../../../queries/booking';
import EditBookingTableCell from '../../../components/table/edit-booking';
export const loader =
	(queryClient: QueryClient) =>
		async ({params}: LoaderFunctionArgs) => {
			if (!params.id) {
				throw new Error('No event ID provided');
			}

			const timeSlot = await queryClient.ensureQueryData(
				timeslotDetailOptions(Number(params.id)),
			);

			return timeSlot;
		};

const ScheduleItemPage: React.FC = () => {
	const timeSlot: TimeSlotDto = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;

	const signedUpViewers = timeSlot.bookings.filter((booking) => !booking.isRider).length;
	const signedUpRiders = timeSlot.bookings.filter((booking) => booking.isRider).length;

	const {id} = useParams<{id: string}>();
	const eventId = Number(id);

	const deleteMutation = useDeleteBooking(eventId);

	return (
		<>
			<div className="mt-10">
				<h2 className="text-4xl font-bold mb-10">{timeSlot.boat?.name}, {getDisplayTimeFromBackend(timeSlot.fromTime)} - {getDisplayTimeFromBackend(timeSlot.untilTime)}</h2>
				<div className='flex gap-5'>
					<span className='flex gap-2'><UserIcon /> {timeSlot.boat?.operator}</span>
					<span className='flex gap-2'><ViewIcon/>{signedUpViewers} / {timeSlot.boat?.seatsViewer}</span>
					<span className='flex gap-2'><UsersIcon />{signedUpRiders} / {timeSlot.boat?.seatsRider}</span>
					<span className='flex gap-2'><TagIcon />{timeSlot.activityType?.name?.de}</span>
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
						{timeSlot.bookings.map((slot, index) => (
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
			</div>
		</>
	);
};

export default ScheduleItemPage;
