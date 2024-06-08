import {type ActivityTypeDto} from './activity-type.model';
import {type TimeSlotDto} from './time-slot.model';

export type BoatDto = {
	id: number;
	name: string;
	type: string;
	seatsRider: number;
	seatsViewer: number;
	operator: string;
	slotDurationInMins?: number;
	availableFrom: string; // Assuming ISO string format for LocalDateTime
	availableUntil: string; // Assuming ISO string format for LocalDateTime
	timeSlotIds?: Set<number>;
	activityTypeId?: number;
	eventId?: number;
	timeSlots?: Set<TimeSlotDto> | undefined;
	activityType?: ActivityTypeDto | undefined;
};

export const defaultBoatDto: BoatDto = {
	id: 0,
	name: '',
	type: '',
	seatsRider: 0,
	seatsViewer: 0,
	operator: '',
	slotDurationInMins: undefined,
	availableFrom: '',
	availableUntil: '',
	timeSlotIds: undefined,
	activityTypeId: undefined,
	eventId: undefined,
	timeSlots: undefined,
	activityType: undefined,
};
