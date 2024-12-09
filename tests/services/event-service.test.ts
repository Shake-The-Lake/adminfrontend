import * as eventService from '../../src/services/event-service';
import { type EventDto } from '../../src/models/api/event.model';
import axiosInstance from '../../src/services/axiosInstance';
import { vi } from 'vitest';
import { getSortedActivityTypes } from '../../src/services/activity-type-service';
import { getSortedBoats } from '../../src/services/boat-service';

vi.mock('../../src/services/axiosInstance');
vi.mock('../../src/services/activity-type-service', () => ({
  getSortedActivityTypes: vi.fn((activityTypes) => activityTypes),
}));
vi.mock('../../src/services/boat-service', () => ({
  getBoatWithSortedProperties: vi.fn((boat) => boat),
  getSortedBoats: vi.fn((boats) => boats),
}));
vi.mock('../../src/config/firebaseConfig', () => ({
  auth: {
    currentUser: { uid: 'test-user' },
    signInWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
  },
}));
describe('event-service', () => {
  beforeEach(() => {
    vi.spyOn(eventService, 'getEventWithSortedProperties');
  });

  describe('getEventWithSortedProperties', () => {
    it('should return event with sorted properties', () => {
      const event: EventDto = { id: 1, title: 'Event', description: 'Description', date: new Date(), customerBarcode: '', employeeBarcode: '', activityTypes: [], boats: [] };
			const result = eventService.getEventWithSortedProperties(event);
      expect(result).toEqual(event);
      expect(getSortedActivityTypes).toHaveBeenCalledWith(event.activityTypes);
      expect(getSortedBoats).toHaveBeenCalledWith(event.boats);
    });
  });

  describe('getAllEvents', () => {
    it('should return all events sorted by date', async () => {
      const events: EventDto[] = [
        { id: 1, title: 'Event 1', description: 'Description 1', date: new Date('2023-01-01'), customerBarcode: '', employeeBarcode: '', activityTypes: [], boats: [] },
        { id: 2, title: 'Event 2', description: 'Description 2', date: new Date('2023-02-01'), customerBarcode: '', employeeBarcode: '', activityTypes: [], boats: [] },
      ];
      axiosInstance.get.mockResolvedValue({ data: events });
			const result = await eventService.getAllEvents();
      expect(result.length).toBe(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });
  });

  describe('getEventById', () => {
    it('should return event by id with sorted properties', async () => {
      const event: EventDto = { id: 1, title: 'Event', description: 'Description', date: new Date(), customerBarcode: '', employeeBarcode: '', activityTypes: [], boats: [] };
      axiosInstance.get.mockResolvedValue({ data: event });
			const result = await eventService.getEventById(1);
      expect(result).toEqual(event);
    });
  });

  describe('createEvent', () => {
    it('should create a new event with sorted properties', async () => {
      const event: EventDto = { id: 1, title: 'Event', description: 'Description', date: new Date(), customerBarcode: '', employeeBarcode: '', activityTypes: [], boats: [] };
      axiosInstance.post.mockResolvedValue({ data: event });
			const result = await eventService.createEvent(event);
      expect(result).toEqual(event);
    });
  });

  describe('deleteEvent', () => {
    it('should delete an event by id', async () => {
      axiosInstance.delete.mockResolvedValue({});
			await eventService.deleteEvent(1);
      expect(axiosInstance.delete).toHaveBeenCalledWith('/event/1');
    });
  });

  describe('updateEvent', () => {
    it('should update an existing event with sorted properties', async () => {
      const event: EventDto = { id: 1, title: 'Event', description: 'Description', date: new Date(), customerBarcode: '', employeeBarcode: '', activityTypes: [], boats: [] };
      axiosInstance.put.mockResolvedValue({ data: event });
			const result = await eventService.updateEvent(1, event);
      expect(result).toEqual(event);
    });
  });
});