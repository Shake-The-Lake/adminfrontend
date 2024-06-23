import React, {useEffect, useState} from 'react';
import {DataTable} from '../../../components/data-table/data-table';
import {
	bookingColumns,
	BookingSearchDto,
} from '../../../models/api/booking-search.model';
import {Button} from '../../../components/ui/button';
import {getBookingsByEventId} from '../../../services/booking-search-service';
import {useNavigate} from 'react-router-dom';

const BookingsPage: React.FC = () => {
	const [data, setData] = useState<BookingSearchDto[]>([]);
	const eventId = location.pathname.split('/').pop();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!eventId) {
					console.error('Event ID is not defined');
					navigate('/');
					return;
				}
				const bookings = await getBookingsByEventId(1);
				setData(bookings);
			} catch (error) {
				console.error('Failed to fetch bookings:', error);
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
				</div>
			</div>
		</>
	);
};

export default BookingsPage;
