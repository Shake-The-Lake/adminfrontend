import { type QueryClient } from '@tanstack/react-query';
import React from 'react';
import {
	type LoaderFunctionArgs,
	useLoaderData,
	useNavigate,
} from 'react-router-dom';
import {
	timeslotDetailOptions,
	useTimeSlotDetail,
} from '../../../queries/time-slot';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../../components/ui/table';
import { EyeIcon, SailboatIcon, TagIcon, UsersIcon } from 'lucide-react';
import { getDisplayTimeFromBackend } from '../../../lib/date-time.utils';
import { useDeleteBooking } from '../../../queries/booking';
import EditBookingTableCell from '../../../components/table/edit-booking';
import {
	extractTypedInfoFromRouteParams,
	getTranslation,
} from '../../../lib/utils';
import { useTranslation } from 'react-i18next';
import PageTransitionFadeIn from '../../../components/animations/page-transition-fade-in';
import ActivityTraceInfo from '../../../components/common/ActivityTraceInfo';

export const loader =
	(queryClient: QueryClient) =>
		async ({ params }: LoaderFunctionArgs) => {
			const routeIds = extractTypedInfoFromRouteParams(params);
			if (!routeIds.timeSlotId) {
				throw new Error('No Timeslot ID provided');
			}

			await queryClient.ensureQueryData(
				timeslotDetailOptions(routeIds.eventId, routeIds.timeSlotId),
			);

			return routeIds;
		};

const ScheduleItemPage: React.FC = () => {
	const { timeSlotId, eventId } = useLoaderData() as Awaited<
		ReturnType<ReturnType<typeof loader>>
	>;

	const {i18n, t} = useTranslation();
	const navigate = useNavigate();

	const {data: timeSlot} = useTimeSlotDetail(eventId, timeSlotId);

	const signedUpRiders =
		(timeSlot?.seatsRider ?? 0) - (timeSlot?.availableRiderSeats ?? 0);
	const signedUpViewers =
		(timeSlot?.seatsViewer ?? 0) - (timeSlot?.availableViewerSeats ?? 0);

	const deleteMutation = useDeleteBooking(eventId);

	return (
		<PageTransitionFadeIn>
			<div className="mt-10">
				<div className="flex justify-between">
					<h2 className="text-4xl font-bold mb-10">
						{timeSlot?.boat?.name},{' '}
						{getDisplayTimeFromBackend(timeSlot?.fromTime)} -{' '}
						{getDisplayTimeFromBackend(timeSlot?.untilTime)}
					</h2>
				</div>
				<div className="flex flex-wrap gap-5">
					<span className="flex gap-2">
						<SailboatIcon /> {timeSlot?.boat?.operator}
					</span>
					<span className="flex gap-2">
						<EyeIcon />
						{signedUpViewers} / {timeSlot?.seatsViewer ?? 0}
					</span>
					<span className="flex gap-2">
						<UsersIcon />
						{signedUpRiders} / {timeSlot?.seatsRider ?? 0}
					</span>
					<span className="flex gap-2">
						<TagIcon />
						{getTranslation(i18n.language, timeSlot?.activityType?.name)}
					</span>
					<ActivityTraceInfo
						{...timeSlot}
					/>
				</div>
				<h2 className="text-2xl mt-10">{t('booking.currentBooking')}</h2>
				<Table className="mt-5">
					<TableHeader>
						<TableRow>
							<TableHead>{t('name')}</TableHead>
							<TableHead>{t('phone')}</TableHead>
							<TableHead>{t('type')}</TableHead>
							<TableHead>{t('manual')}</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{timeSlot?.bookings.length ? (
							timeSlot?.bookings.map((slot, index) => (
								<TableRow
									key={index}
									className="w-full justify-between"
									onClick={() => {
										navigate(`/event/${eventId}/bookings/edit/${slot.id}`);
									}}>
									<TableCell>
										{slot.person?.firstName} {slot.person?.lastName}
									</TableCell>
									<TableCell>{slot.person?.phoneNumber}</TableCell>
									<TableCell>
										{slot.isRider
											? t('booking.isRider')
											: t('booking.isViewer')}
									</TableCell>
									<TableCell>
										{slot.isManual
											? `${t('yes')} - ${slot.pagerNumber}`
											: t('no')}
									</TableCell>
									<EditBookingTableCell
										booking={slot}
										deleteMutation={deleteMutation}></EditBookingTableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} className="h-24 text-center">
									{t('booking.noBookingsYet')}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</PageTransitionFadeIn>
	);
};

export default ScheduleItemPage;
