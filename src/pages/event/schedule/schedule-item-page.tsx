import {type QueryClient} from '@tanstack/react-query';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useLoaderData, type LoaderFunctionArgs} from 'react-router-dom';
import {boatDetailOptions, boatsOptions} from '../../../queries/boat';
import {timeslotDetailOptions, useTimeSlotDetail} from '../../../queries/time-slot';
import {Table} from 'lucide-react';
import boat from '../../../components/forms/boat';
import EditTimeSlotTableCell from '../../../components/table/edit-time-slot-table-cell';
import {TableHeader, TableRow, TableHead, TableBody, TableCell} from '../../../components/ui/table';
import {getDisplayTimeFromBackend} from '../../../lib/date-time.utils';
import timeSlots from '../boat/time-slots';
export const loader =
	(queryClient: QueryClient) =>
		async ({params}: LoaderFunctionArgs) => {
			if (!params.id) {
				throw new Error('No event ID provided');
			}

			const timeSlot = await queryClient.ensureQueryData(
				timeslotDetailOptions(Number(params.id)),
			);

			const boat = await queryClient.ensureQueryData(
				boatDetailOptions(Number(timeSlot.boatId)),
			);

			return {...timeSlot, boat};
		};

const ScheduleItemPage: React.FC = () => {
	const timeSlot = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;
	console.log(timeSlot);

	return (
		<>
			<div className="flex flex-col items-center py-24">
				<h1 className="text-2xl font-bold mb-10">{timeSlot.boat?.name} + {timeSlot.fromTime} + {timeSlot.untilTime}</h1>
				<div>
					<p><span>Rider: {timeSlot.boat?.operator}</span><span>Viewer: {timeSlot.boat.seatsViewer}</span><span>Rider: {timeSlot.boat.seatsRider}</span><span>Activity Type: {timeSlot.activityType?.name?.de}</span></p>
				</div>

				<Table className="mt-5">
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Manual</TableHead>
						</TableRow>
					</TableHeader>
				</Table>
			</div>
		</>
	);
};

export default ScheduleItemPage;
