import {type ActivityTypeDto} from './activity-type.model';
import {type TimeSlotDto} from './time-slot.model';

export type BoatDto = {
	id: number;
	boatDriverId?: number;
	name: string;
	type: string;
	seatsRider?: number;
	seatsViewer?: number;
	slotDurationInMins?: number;
	availableFrom: string; // Assuming ISO string format for LocalDateTime
	availableUntil: string; // Assuming ISO string format for LocalDateTime
	timeSlotIds?: Set<number>;
	activityTypeId?: number;
	eventId?: number;
	timeSlots?: Set<TimeSlotDto> | undefined;
	activityType?: ActivityTypeDto | undefined;
};
