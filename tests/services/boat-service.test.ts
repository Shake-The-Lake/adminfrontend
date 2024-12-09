import { getSortedBoats, getBoatWithSortedProperties, getAllBoatsFromEvent, getBoatById, createBoat, updateBoat, deleteBoat } from '../../src/services/boat-service';
import { type BoatDto } from '../../src/models/api/boat.model';
import axiosInstance from '../../src/services/axiosInstance';
import { getSortedTimeSlots } from '../../src/services/time-slot-service';
import { vi } from 'vitest';

vi.mock('../../src/services/axiosInstance');
vi.mock('../../src/services/time-slot-service', () => ({
	getSortedTimeSlots: vi.fn((timeSlots) => timeSlots),
})); 
vi.mock('../../src/config/firebaseConfig', () => ({
	auth: {
		currentUser: { uid: 'test-user' },
		signInWithEmailAndPassword: vi.fn(),
		signOut: vi.fn(),
	},
}));

describe('boat-service', () => {
	describe('getSortedBoats', () => {
		it('should return sorted boats', () => {
			const boats: BoatDto[] = [
				{ id: 1, name: 'Boat B', availableFrom: '09:00', availableUntil: '17:00', type: '', seatsRider: 0, seatsViewer: 0, operator: '', timeSlots: new Set() },
				{ id: 2, name: 'Boat A', availableFrom: '08:00', availableUntil: '16:00', type: '', seatsRider: 0, seatsViewer: 0, operator: '', timeSlots: new Set() },
			];
			const sortedBoats = getSortedBoats(boats);
			expect(sortedBoats[0].name).toBe('Boat A');
			expect(sortedBoats[1].name).toBe('Boat B');
		});

		it('should return an empty array if no boats are provided', () => {
			const sortedBoats = getSortedBoats();
			expect(sortedBoats).toEqual([]);
		});
	});

	describe('getBoatWithSortedProperties', () => {
		it('should return boat with sorted time slots', () => {
			const boat: BoatDto = { id: 1, name: 'Boat A', availableFrom: '08:00', availableUntil: '16:00', type: '', seatsRider: 0, seatsViewer: 0, operator: '', timeSlots: new Set() };
			const result = getBoatWithSortedProperties(boat);
			expect(result.timeSlots).toEqual(getSortedTimeSlots(boat.timeSlots));
		});
	});

	describe('getAllBoatsFromEvent', () => {
		it('should return sorted boats for a given event', async () => {
			const boats: BoatDto[] = [
				{ id: 1, name: 'Boat A', availableFrom: '08:00', availableUntil: '16:00', type: '', seatsRider: 0, seatsViewer: 0, operator: '', eventId: 1, timeSlots: new Set() },
				{ id: 2, name: 'Boat B', availableFrom: '09:00', availableUntil: '17:00', type: '', seatsRider: 0, seatsViewer: 0, operator: '', eventId: 1, timeSlots: new Set() },
			];
			axiosInstance.get.mockResolvedValue({ data: boats });
			const result = await getAllBoatsFromEvent(1);
			expect(result.length).toBe(2);
			expect(result[0].name).toBe('Boat A');
		});
	});

	describe('getBoatById', () => {
		it('should return boat by id', async () => {
			const boat: BoatDto = { id: 1, name: 'Boat A', availableFrom: '08:00', availableUntil: '16:00', type: '', seatsRider: 0, seatsViewer: 0, operator: '', timeSlots: new Set() };
			axiosInstance.get.mockResolvedValue({ data: boat });
			const result = await getBoatById(1);
			expect(result).toEqual(boat);
		});
	});

	describe('createBoat', () => {
		it('should create a new boat', async () => {
			const boat: BoatDto = { id: 1, name: 'Boat A', availableFrom: '08:00', availableUntil: '16:00', type: '', seatsRider: 0, seatsViewer: 0, operator: '', timeSlots: new Set() };
			axiosInstance.post.mockResolvedValue({ data: boat });
			const result = await createBoat(boat);
			expect(result).toEqual(boat);
		});
	});

	describe('updateBoat', () => {
		it('should update an existing boat', async () => {
			const boat: BoatDto = { id: 1, name: 'Boat A', availableFrom: '08:00', availableUntil: '16:00', type: '', seatsRider: 0, seatsViewer: 0, operator: '', timeSlots: new Set() };
			axiosInstance.put.mockResolvedValue({ data: boat });
			const result = await updateBoat(1, boat);
			expect(result).toEqual(boat);
		});
	});

	describe('deleteBoat', () => {
		it('should delete a boat by id', async () => {
			axiosInstance.delete.mockResolvedValue({});
			await deleteBoat(1);
			expect(axiosInstance.delete).toHaveBeenCalledWith('/boat/1');
		});
	});
});