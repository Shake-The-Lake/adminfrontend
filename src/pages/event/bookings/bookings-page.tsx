import React, { useState } from 'react';
import { DataTable } from '../../../components/data-table/data-table';
import {
	bookingColumns,
	type BookingSearchDto,
	defaultBookingSearchParams,
} from '../../../models/api/booking-search.model';
import { Button } from '../../../components/ui/button';
import {
	Link,
	type LoaderFunctionArgs,
	useLoaderData,
	useNavigate,
} from 'react-router-dom';
import {
	bookingsSearchOptions,
	useSearchBookings,
} from '../../../queries/booking';
import { type QueryClient } from '@tanstack/react-query';
import StlFilter, {
	StlFilterOptions,
} from '../../../components/data-table/stl-filter';
import { defaultFilterParams } from '../../../models/api/search.model';
import { eventDetailRoutes } from '../../../constants';
import { extractTypedInfoFromRouteParams, type RouteParamsLoaderData } from '../../../lib/utils';
import { useTranslation } from 'react-i18next';
import PageTransitionFadeIn from '../../../components/animations/page-transition-fade-in';

export const loader =
	(queryClient: QueryClient) =>
		async ({ params }: LoaderFunctionArgs) => {
			const routeIds = extractTypedInfoFromRouteParams(params);
			if (!routeIds.eventId) {
				throw new Error('No event ID provided');
			}

			await queryClient.ensureQueryData(
				bookingsSearchOptions(
					routeIds.eventId,
					defaultBookingSearchParams,
					queryClient,
				),
			);

			return routeIds;
		};

const BookingsPage: React.FC = () => {
	const { eventId } = useLoaderData() as RouteParamsLoaderData;
	const navigate = useNavigate();
	const [filter, setFilter] = useState(defaultBookingSearchParams);
	const { data: bookings, error } = useSearchBookings(eventId, filter);

	const { t } = useTranslation();
	const searchParams = defaultFilterParams;
	searchParams.onSearchTermChange = (searchTerm?: string) => {
		setFilter({ ...filter, personName: searchTerm });
	};

	searchParams.onActivityTypeChange = (activityTypeId?: number) => {
		setFilter({ ...filter, activityId: activityTypeId });
	};

	searchParams.onBoatChange = (boatId?: number) => {
		setFilter({ ...filter, boatId });
	};

	searchParams.onFromChange = (from?: string) => {
		setFilter({ ...filter, from });
	};

	searchParams.onToChange = (to?: string) => {
		setFilter({ ...filter, to });
	};

	const handleRowClick = (row: BookingSearchDto) => {
		navigate(`/event/${eventId}/bookings/edit/${row.booking.id}`);
	};

	return (
		<PageTransitionFadeIn>
			<div className="flex flex-col items-center">
				<div className="w-full mb-8 flex justify-between items-center">
					<h1>{t('booking.title')}</h1>

					<Button data-testid="booking-create-button">
						<Link to={`${eventDetailRoutes.addBooking}`} relative="path">
							{t('booking.create')}
						</Link>
					</Button>
				</div>
				<div className="w-full">
					{error === null ? (
						<>
							<StlFilter
								options={StlFilterOptions.All}
								params={searchParams}></StlFilter>
							<DataTable
								columns={bookingColumns}
								data={bookings ?? []}
								onRowClick={handleRowClick}
							/>
						</>
					) : (
						<p>{t('booking.errorLoadingBooking')}</p>
					)}
				</div>
			</div>
		</PageTransitionFadeIn>
	);
};

export default BookingsPage;
