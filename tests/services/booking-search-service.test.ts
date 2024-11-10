import { getDefaultSortedBoookings, getBookingsByEventId, searchBookings, deleteBooking } from '../../src/services/booking-search-service';
import { type BookingSearchDto, type BookingSearchParams } from '../../src/models/api/booking-search.model';
import axiosInstance from '../../src/services/axiosInstance';
import { vi } from 'vitest';
import { TimeSlotType } from '../../src/models/api/time-slot.model';

vi.mock('../../src/services/axiosInstance');
vi.mock('lodash-es/sortBy', () => ({
	sortBy: vi.fn((array, iteratees) => array.sort((a, b) => {
		for (const iteratee of iteratees) {
			const aValue = typeof iteratee === 'function' ? iteratee(a) : a[iteratee];
			const bValue = typeof iteratee === 'function' ? iteratee(b) : b[iteratee];
			if (aValue < bValue) return -1;
			if (aValue > bValue) return 1;
		}
		return 0;
	})),
}));
vi.mock('../../src/components/data-table/cleanEmptyParams', () => ({
	cleanEmptyParams: vi.fn((params) => params),
}));

describe('booking-search-service', () => {
	describe('getDefaultSortedBoookings', () => {
		it('should return sorted bookings', () => {
			const bookings: BookingSearchDto[] = [
				{
					person: {
						firstName: 'John', lastName: 'Doe',
						personType: 'EMPLOYEE',
						emailAddress: '',
						phoneNumber: ''
					}, boat: {
						name: 'Boat B',
						id: 0,
						type: '',
						seatsRider: 0,
						seatsViewer: 0,
						operator: '',
						availableFrom: '',
						availableUntil: ''
					}, timeSlot: {
						fromTime: '10:00',
						id: 0,
						bookings: [],
						availableSeats: 0,
						seatsRider: 0,
						seatsViewer: 0,
						availableRiderSeats: 0,
						availableViewerSeats: 0,
						status: TimeSlotType.AVAILABLE
					}, activityType: { name: { en: 'Activity' } }
				},
				{
					person: {
						firstName: 'Jane', lastName: 'Smith',
						personType: 'EMPLOYEE',
						emailAddress: '',
						phoneNumber: ''
					}, boat: {
						name: 'Boat A',
						id: 0,
						type: '',
						seatsRider: 0,
						seatsViewer: 0,
						operator: '',
						availableFrom: '',
						availableUntil: ''
					}, timeSlot: {
						fromTime: '09:00',
						id: 0,
						bookings: [],
						availableSeats: 0,
						seatsRider: 0,
						seatsViewer: 0,
						availableRiderSeats: 0,
						availableViewerSeats: 0,
						status: TimeSlotType.AVAILABLE
					}, activityType: { name: { en: 'Activity' } }
				},
			];
			const sortedBookings = getDefaultSortedBoookings(bookings);
			expect(sortedBookings[0].boat.name).toBe('Boat A');
			expect(sortedBookings[1].boat.name).toBe('Boat B');
		});

		it('should return an empty array if no bookings are provided', () => {
			const sortedBookings = getDefaultSortedBoookings();
			expect(sortedBookings).toEqual([]);
		});
	});

	describe('getBookingsByEventId', () => {
		it('should return sorted bookings for a given event', async () => {
			const bookings: BookingSearchDto[] = [
				{ person: { firstName: 'John', lastName: 'Doe' }, boat: { name: 'Boat B' }, timeSlot: { fromTime: '10:00' }, activityType: { name: { en: 'Activity' } } },
				{ person: { firstName: 'Jane', lastName: 'Smith' }, boat: { name: 'Boat A' }, timeSlot: { fromTime: '09:00' }, activityType: { name: { en: 'Activity' } } },
			];
			axiosInstance.get.mockResolvedValue({ data: bookings });
			const result = await getBookingsByEventId(1);
			expect(result.length).toBe(2);
			expect(result[0].boat.name).toBe('Boat A');
		});
	});

	describe('searchBookings', () => {
		it('should return sorted bookings based on search parameters', async () => {
			const bookings: BookingSearchDto[] = [
				{ person: { firstName: 'John', lastName: 'Doe' }, boat: { name: 'Boat B' }, timeSlot: { fromTime: '10:00' }, activityType: { name: { en: 'Activity' } } },
				{ person: { firstName: 'Jane', lastName: 'Smith' }, boat: { name: 'Boat A' }, timeSlot: { fromTime: '09:00' }, activityType: { name: { en: 'Activity' } } },
			];
			const searchParams: BookingSearchParams = { personName: 'John' };
			axiosInstance.get.mockResolvedValue({ data: bookings });
			const result = await searchBookings(1, searchParams);
			expect(result.length).toBe(2);
			expect(result[0].boat.name).toBe('Boat A');
		});
	});

	describe('deleteBooking', () => {
		it('should delete a booking by id', async () => {
			axiosInstance.delete.mockResolvedValue({});
			await deleteBooking(1);
			expect(axiosInstance.delete).toHaveBeenCalledWith('/booking/1');
		});
	});
});