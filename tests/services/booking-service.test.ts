import { createBooking, updateBooking } from '../../src/services/booking-service';
import { type BookingDto } from '../../src/models/api/booking.model';
import axiosInstance from '../../src/services/axiosInstance';
import { vi } from 'vitest';

vi.mock('../../src/services/axiosInstance');
vi.mock('../../src/config/firebaseConfig', () => ({
	auth: {
		currentUser: { uid: 'test-user' },
		signInWithEmailAndPassword: vi.fn(),
		signOut: vi.fn(),
	},
}));
describe('booking-service', () => {
	describe('createBooking', () => {
		it('should create a new booking', async () => {
			const booking: BookingDto = { id: 1, isRider: true, isManual: false, personId: 1, timeSlotId: 1 };
			axiosInstance.post.mockResolvedValue({ data: booking });
			const result = await createBooking(booking);
			expect(result).toEqual(booking);
			expect(axiosInstance.post).toHaveBeenCalledWith('/booking', booking);
		});
	});

	describe('updateBooking', () => {
		it('should update an existing booking', async () => {
			const booking: BookingDto = { id: 1, isRider: true, isManual: false, personId: 1, timeSlotId: 1 };
			axiosInstance.put.mockResolvedValue({ data: booking });
			const result = await updateBooking(booking.id ?? 1, booking);
			expect(result).toEqual(booking);
			expect(axiosInstance.put).toHaveBeenCalledWith(`/booking/${booking.id}`, booking);
		});
	});
});