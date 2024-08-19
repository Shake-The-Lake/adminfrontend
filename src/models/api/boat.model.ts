import {type TimeSlotDto} from './time-slot.model';

export type BoatDto = {
	id: number;
	name: string;
	type: string;
	seatsRider: number;
	seatsViewer: number;
	operator: string;
	slotDurationInMins?: number;
	availableFrom: Date; // Assuming ISO string format for LocalDateTime
	availableUntil: Date; // Assuming ISO string format for LocalDateTime
	timeSlotIds?: Set<number>;
	eventId?: number;
	activityTypeId?: number;
	timeSlots?: Set<TimeSlotDto> | undefined;
};

export const defaultBoatDto: BoatDto = {
	id: 0,
	name: '',
	type: '',
	seatsRider: 0,
	seatsViewer: 0,
	operator: '',
	slotDurationInMins: undefined,
	availableFrom: new Date(),
	availableUntil: new Date(),
	timeSlotIds: undefined,
	eventId: undefined,
	timeSlots: undefined,
};
