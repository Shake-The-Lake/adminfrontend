import React, {useState} from 'react';
import {DataTable} from '../../../components/data-table/data-table';
import {
	bookingColumns,
	defaultBookingSearchParams,
} from '../../../models/api/booking-search.model';
import {Button} from '../../../components/ui/button';
import {type LoaderFunctionArgs, useLoaderData} from 'react-router-dom';
import LoadingSpinner from '../../../components/animations/loading';
import {
	bookingsSearchOptions,
	useSearchBookings,
} from '../../../queries/booking';
import {type QueryClient} from '@tanstack/react-query';
import StlFilter, {
	StlFilterOptions,
} from '../../../components/data-table/stl-filter';
import {defaultFilterParams} from '../../../models/api/search.model';

export const loader =
	(queryClient: QueryClient) =>
		async ({params}: LoaderFunctionArgs) => {
			if (!params.id) {
				throw new Error('No event ID provided');
			}

			await queryClient.ensureQueryData(
				bookingsSearchOptions(
					Number(params.id),
					defaultBookingSearchParams,
					queryClient,
				),
			);
			return {eventId: Number(params.id)};
		};

const BookingsPage: React.FC = () => {
	const {eventId} = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;
	const [filter, setFilter] = useState(defaultBookingSearchParams);

	const {data: bookings, isPending, error} = useSearchBookings(eventId, filter);

	const searchParams = defaultFilterParams;

	searchParams.onSearchTermChange = (searchTerm?: string) => {
		setFilter({...filter, personName: searchTerm});
	};

	searchParams.onActivityTypeChange = (activityTypeId?: number) => {
		setFilter({...filter, activityId: activityTypeId});
	};

	searchParams.onBoatChange = (boatId?: number) => {
		setFilter({...filter, boatId});
	};

	searchParams.onFromChange = (from?: string) => {
		setFilter({...filter, from});
	};

	searchParams.onToChange = (to?: string) => {
		setFilter({...filter, to});
	};

	return (
		<div className="flex flex-col items-center">
			<LoadingSpinner isLoading={isPending} />
			<div className="w-full mb-8 flex justify-between items-center">
				<h1>Bookings</h1>
				<Button>Add Booking</Button>
			</div>
			<div className="w-full">
				{error === null ? (
					<>
						<StlFilter
							options={StlFilterOptions.All}
							params={searchParams}></StlFilter>
						<DataTable columns={bookingColumns} data={bookings ?? []} />
					</>
				) : (
					<p>Failed to load bookings!</p>
				)}
			</div>
		</div>
	);
};

export default BookingsPage;
