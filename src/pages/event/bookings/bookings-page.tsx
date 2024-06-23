import React, {useEffect, useState} from 'react';
import {DataTable} from '../../../components/data-table/data-table';
import {
	bookingColumns,
	BookingSearchDto,
} from '../../../models/api/booking-search.model';
import {Button} from '../../../components/ui/button';
import {getBookingsByEventId} from '../../../services/booking-search-service';
import {useLocation, useNavigate} from 'react-router-dom';
import LoadingSpinner from '../../../components/animations/loading';

const BookingsPage: React.FC = () => {
	const [data, setData] = useState<BookingSearchDto[]>([]);
	const location = useLocation();
	const pathSegments = location.pathname.split('/');
	const eventId = pathSegments[pathSegments.length - 2];
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!eventId) {
					console.error('Event ID is not defined');
					navigate('/');
					return;
				}
				const bookings = await getBookingsByEventId(Number(eventId));
				setData(bookings);
				setIsLoading(false);
			} catch (error) {
				console.error('Failed to fetch bookings:', error);
				setIsLoading(false);
			}
		};
		fetchData();
	}, [eventId]);

	return (
		<>
			<div className="flex flex-col items-center">
				<div className="w-full mb-8 flex justify-between items-center">
					<h1>Bookings</h1>
					<Button>Add Booking</Button>
				</div>
				<div className="w-full">
					<DataTable columns={bookingColumns} data={data} />
					<LoadingSpinner isLoading={isLoading} />
				</div>
			</div>
		</>
	);
};

export default BookingsPage;
