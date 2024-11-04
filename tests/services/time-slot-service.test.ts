import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
	getAllTimeSlotsFromEvent,
	getTimeSlotById,
	createTimeSlot,
	updateTimeSlot,
	deleteTimeSlot,
	getSortedTimeSlotsFromArray,
	getSortedTimeSlots,
} from '../../src/services/time-slot-service';
import axiosInstance from '../../src/services/axiosInstance';
import { getPersonById } from '../../src/services/person-service';
import { getTranslation } from '../../src/lib/utils';
import { type TimeSlotDto } from '../../src/models/api/time-slot.model';
import { getI18n } from 'react-i18next';

vi.mock('../../src/services/axiosInstance');
vi.mock('../../src/services/person-service');
vi.mock('../../src/lib/utils', () => ({
	getTranslation: vi.fn(),
}));
vi.mock('react-i18next', () => ({
	getI18n: vi.fn(() => ({language: 'en'})),
}));

describe('TimeSlot Service', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getSortedTimeSlotsFromArray', () => {
		it('should return sorted time slots by fromTime, untilTime, and activityType name', () => {
			const timeSlots: TimeSlotDto[] = [
				{ fromTime: '10:00', untilTime: '11:00', activityType: { name: 'B' } },
				{ fromTime: '09:00', untilTime: '10:00', activityType: { name: 'A' } },
			];
			(getTranslation as vi.Mock).mockImplementation((_, name) => name);

			const sortedTimeSlots = getSortedTimeSlotsFromArray(timeSlots);

			expect(sortedTimeSlots[0].fromTime).toBe('09:00');
			expect(sortedTimeSlots[0].activityType?.name).toBe('A');
		});

		it('should return an empty array if no time slots are provided', () => {
			const sortedTimeSlots = getSortedTimeSlotsFromArray(undefined);
			expect(sortedTimeSlots).toEqual([]);
		});
	});

	describe('getSortedTimeSlots', () => {
		it('should return a sorted Set of time slots', () => {
			const timeSlots = new Set<TimeSlotDto>([
				{ fromTime: '10:00', untilTime: '11:00', activityType: { name: 'B' } },
				{ fromTime: '09:00', untilTime: '10:00', activityType: { name: 'A' } },
			]);
			(getTranslation as vi.Mock).mockImplementation((_, name) => name);

			const sortedTimeSlots = getSortedTimeSlots(timeSlots);

			expect(Array.from(sortedTimeSlots)[0].fromTime).toBe('09:00');
		});

		it('should return an empty Set if no time slots are provided', () => {
			const sortedTimeSlots = getSortedTimeSlots(undefined);
			expect(sortedTimeSlots.size).toBe(0);
		});
	});

	describe('getAllTimeSlotsFromEvent', () => {
		it('should fetch and return sorted time slots', async () => {
			const timeSlots: TimeSlotDto[] = [
				{ fromTime: '10:00', untilTime: '11:00', activityType: { name: 'B' } },
				{ fromTime: '09:00', untilTime: '10:00', activityType: { name: 'A' } },
			];

			axiosInstance.get.mockResolvedValue({ data: timeSlots });
			(getTranslation as vi.Mock).mockImplementation((_, name) => name);

			const result = await getAllTimeSlotsFromEvent(1);
			expect(result[0].fromTime).toBe('09:00');
			expect(result[0].activityType?.name).toBe('A');
		});
	});

	describe('getTimeSlotById', () => {
		it('should fetch a time slot by id', async () => {
			const timeSlot: TimeSlotDto = {
				fromTime: '10:00',
				untilTime: '11:00',
				activityType: { name: 'Test Activity' },
				bookings: [{ personId: 1 }],
			};

			axiosInstance.get.mockResolvedValue({ data: timeSlot });
			getPersonById.mockResolvedValue({ id: 1, name: 'John Doe' });

			const result = await getTimeSlotById(1);

			expect(result.fromTime).toBe('10:00');
			expect(result.bookings[0].person.name).toBe('John Doe');
		});
	});

	describe('createTimeSlot', () => {
		it('should create a new time slot', async () => {
			const newTimeSlot: TimeSlotDto = {
				fromTime: '10:00',
				untilTime: '11:00',
				activityType: { name: 'Test Activity' },
			};

			axiosInstance.post.mockResolvedValue({ data: newTimeSlot });

			const result = await createTimeSlot(newTimeSlot);

			expect(result.fromTime).toBe('10:00');
			expect(axiosInstance.post).toHaveBeenCalledWith('/timeslot', newTimeSlot);
		});
	});

	describe('updateTimeSlot', () => {
		it('should update an existing time slot', async () => {
			const updatedTimeSlot: TimeSlotDto = {
				fromTime: '10:00',
				untilTime: '11:00',
				activityType: { name: 'Updated Activity' },
			};

			axiosInstance.put.mockResolvedValue({ data: updatedTimeSlot });

			const result = await updateTimeSlot(1, updatedTimeSlot);

			expect(result.activityType?.name).toBe('Updated Activity');
			expect(axiosInstance.put).toHaveBeenCalledWith('/timeslot/1', updatedTimeSlot);
		});
	});

	describe('deleteTimeSlot', () => {
		it('should delete a time slot', async () => {
			axiosInstance.delete.mockResolvedValue({});

			await deleteTimeSlot(1);

			expect(axiosInstance.delete).toHaveBeenCalledWith('/timeslot/1');
		});
	});
});
