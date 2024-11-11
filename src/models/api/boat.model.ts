import {toSwissLocaleTimeString} from '../../lib/date-time.utils';
import {type BaseModel} from './base.model';
import {type TimeSlotDto} from './time-slot.model';

export type BoatDto = BaseModel & {
	id: number;
	name: string;
	type: string;
	seatsRider: number;
	seatsViewer: number;
	operator: string;
	slotDurationInMins?: number;
	availableFrom: string; // Assuming hh:mm:ss format for time
	availableUntil: string; // Assuming hh:mm:ss format for time
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
	availableFrom: toSwissLocaleTimeString(new Date()),
	availableUntil: toSwissLocaleTimeString(new Date()),
	timeSlotIds: undefined,
	eventId: undefined,
	timeSlots: undefined,
};
