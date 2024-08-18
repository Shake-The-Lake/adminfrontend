import React from 'react';
import {DataTable} from '../../../components/data-table/data-table';
import {
	bookingColumns,
} from '../../../models/api/booking-search.model';
import {Button} from '../../../components/ui/button';
import {
	type LoaderFunctionArgs,
	useLoaderData,
} from 'react-router-dom';
import LoadingSpinner from '../../../components/animations/loading';
import {bookingsOptions, useGetBookings} from '../../../queries/booking';
import {type QueryClient} from '@tanstack/react-query';

export const loader =
	(queryClient: QueryClient) =>
		async ({params}: LoaderFunctionArgs) => {
			if (!params.id) {
				throw new Error('No event ID provided');
			}

			await queryClient.ensureQueryData(
				bookingsOptions(Number(params.id), queryClient),
			);
			return {eventId: Number(params.id)};
		};

const BookingsPage: React.FC = () => {
	const {eventId} = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;
	const {data: bookings, isPending, error} = useGetBookings(eventId);

	// Todo! make filterable in backend?!

	return (
		<>
			<LoadingSpinner isLoading={isPending} />
			<div className="flex flex-col items-center">
				<div className="w-full mb-8 flex justify-between items-center">
					<h1>Bookings</h1>
					<Button>Add Booking</Button>
				</div>
				<div className="w-full">
					{error === null ? (
						<DataTable columns={bookingColumns} data={bookings} />
					) : (
						<p>Failed to load bookings!</p>
					)}
				</div>
			</div>
		</>
	);
};

export default BookingsPage;
