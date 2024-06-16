import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {DataTable} from '../../../components/data-table/data-table';
import {BookingDto, columns} from '../../../models/api/booking.model';

const BookingsPage: React.FC = () => {
	const {t} = useTranslation();
	const [data, setData] = useState<BookingDto[]>([]);

	async function getData(): Promise<BookingDto[]> {
		return [
			{
				id: 1,
				isRider: true,
				isManual: false,
				pagerNumber: 123,
				person: 'John Doe',
				timeSlot: {
					id: 1,
					fromTime: new Date().toISOString(),
					untilTime: new Date().toISOString(),
					boatId: 1,
					bookingIds: new Set([1]),
				},
			},
		];
	}

	useEffect(() => {
		const fetchData = async () => {
			const result = await getData();
			setData(result);
		};
		fetchData();
	}, []);

	return (
		<>
			<div className="flex flex-col items-center">
				<div className="w-full mb-8 flex flex-col justify-start">
					<h1>Bookings</h1>
				</div>
				<DataTable columns={columns} data={data} />
			</div>
		</>
	);
};

export default BookingsPage;
