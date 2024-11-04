import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getI18n } from 'react-i18next';
import axiosInstance from '../../src/services/axiosInstance';
import { getTranslation } from '../../src/lib/utils';
import { getSortedActivityTypes, getAllActivityTypesFromEvent, getActivityTypeById, createActivityType, updateActivityType, deleteActivityType } from '../../src/services/activity-type-service';

vi.mock('../../src/services/axiosInstance');
vi.mock('react-i18next', () => ({
	getI18n: vi.fn(),
}));
vi.mock('../../src/lib/utils', () => ({
	getTranslation: vi.fn(),
}));

describe('activity-type-service', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getSortedActivityTypes', () => {
		it('should return sorted activity types', () => {
			const activityTypes = [
				{ name: 'B', description: 'Desc B' },
				{ name: 'A', description: 'Desc A' },
			];
			const i18n = { language: 'en' };
			getI18n.mockReturnValue(i18n);
			getTranslation.mockImplementation((locale, text) => text);

			const result = getSortedActivityTypes(activityTypes);
			expect(result[0].name).toBe('A');
			expect(result[1].name).toBe('B');
		});

		it('should return an empty array if no activity types are provided', () => {
			const result = getSortedActivityTypes();
			expect(result).toEqual([]);
		});
	});

	describe('getAllActivityTypesFromEvent', () => {
		it('should return filtered and sorted activity types', async () => {
			const activityTypes = [
				{ eventId: 1, name: 'B', description: 'Desc B' },
				{ eventId: 1, name: 'A', description: 'Desc A' },
				{ eventId: 2, name: 'C', description: 'Desc C' },
			];
			axiosInstance.get.mockResolvedValue({ data: activityTypes });
			getTranslation.mockImplementation((locale, text) => text);

			const result = await getAllActivityTypesFromEvent(1);
			expect(result.length).toBe(2);
			expect(result[0].name).toBe('A');
			expect(result[1].name).toBe('B');
		});
	});

	describe('getActivityTypeById', () => {
		it('should return the activity type by ID', async () => {
			const activityType = { id: 1, name: 'Activity 1' };
			axiosInstance.get.mockResolvedValue({ data: activityType });

			const result = await getActivityTypeById(1);
			expect(result).toEqual(activityType);
		});
	});

	describe('createActivityType', () => {
		it('should create a new activity type', async () => {
			const newActivityType = { name: 'New Activity' };
			axiosInstance.post.mockResolvedValue({ data: newActivityType });

			const result = await createActivityType(newActivityType);
			expect(result).toEqual(newActivityType);
		});
	});

	describe('updateActivityType', () => {
		it('should update the activity type', async () => {
			const updatedActivityType = { id: 1, name: 'Updated Activity' };
			axiosInstance.put.mockResolvedValue({ data: updatedActivityType });

			const result = await updateActivityType(1, updatedActivityType);
			expect(result).toEqual(updatedActivityType);
		});
	});

	describe('deleteActivityType', () => {
		it('should delete the activity type', async () => {
			axiosInstance.delete.mockResolvedValue({});

			await deleteActivityType(1);
			expect(axiosInstance.delete).toHaveBeenCalledWith('/activitytype/1');
		});
	});
});