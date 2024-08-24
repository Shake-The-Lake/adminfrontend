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
	defaultFilterParams,
	StlFilterConfig,
} from '../../../components/data-table/stl-filter';

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

	// Todo! add other conditions; investigate why backend logic doesn't work??
	searchParams.onActivityTypeChange = (activityTypeId?: number) => {
		setFilter({...filter, activity: activityTypeId});
	};

	// Todo! make filterable in backend?!

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
							config={StlFilterConfig.All}
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
