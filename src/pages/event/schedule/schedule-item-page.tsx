import {type QueryClient} from '@tanstack/react-query';
import React from 'react';
import {useLoaderData, type LoaderFunctionArgs} from 'react-router-dom';
import {boatDetailOptions, boatsOptions} from '../../../queries/boat';
import {timeslotDetailOptions, useTimeSlotDetail} from '../../../queries/time-slot';
import {TableHeader, TableRow, TableHead, TableBody, TableCell, Table} from '../../../components/ui/table';
import {FlowerIcon, GroupIcon, TagIcon, UsbIcon, UserIcon, UsersIcon, ViewIcon} from 'lucide-react';
import {getDisplayTimeFromBackend} from '../../../lib/date-time.utils';
import timeSlots from '../boat/time-slots';
import {type TimeSlotDto} from '../../../models/api/time-slot.model';
import EditTimeSlotTableCell from '../../../components/table/edit-time-slot-table-cell';
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
	console.log(timeSlot);

	return (
		<>
			<div className="mt-10">
				<h2 className="text-4xl font-bold mb-10">{timeSlot.boat?.name}, {getDisplayTimeFromBackend(timeSlot.fromTime)} - {getDisplayTimeFromBackend(timeSlot.untilTime)}</h2>
				<div className='flex gap-5'>
					<span className='flex gap-2'><UserIcon /> {timeSlot.boat?.operator}</span>
					<span className='flex gap-2'><ViewIcon/> {timeSlot.boat?.seatsViewer}</span>
					<span className='flex gap-2'><UsersIcon /> {timeSlot.boat?.seatsRider}</span>
					<span className='flex gap-2'><TagIcon />{timeSlot.activityType?.name?.de}</span>
				</div>
				<h2 className='text-2xl mt-10'>Current Booking</h2>
				<Table className="mt-2">
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Manual</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{timeSlot.bookings.map((slot, index) => (
							<TableRow key={index} className="w-full justify-between">
								<TableCell>{slot.personId}</TableCell>
								<TableCell>
									isManual: {slot.isManual}
								</TableCell>
								<EditTimeSlotTableCell
									boat={timeSlot.boat}
									timeSlot={timeSlot}
									deleteMutation={deleteMutation}></EditTimeSlotTableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export default ScheduleItemPage;
