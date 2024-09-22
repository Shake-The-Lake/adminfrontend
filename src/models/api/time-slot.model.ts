import {toSwissLocaleTimeString} from '../../lib/date-time.utils';
import {type ActivityTypeDto} from './activity-type.model';
import {type BoatDto} from './boat.model';

export type TimeSlotDto = {
	id: number;
	fromTime?: string; // Assuming ISO string format for LocalDateTime
	untilTime?: string; // Assuming ISO string format for LocalDateTime
	boatId?: number;
	boat?: BoatDto;
	activityTypeId?: number;
	activityType?: ActivityTypeDto;
	bookingIds?: Set<number>;
	availableSeats: number;
	status: string; // Todo! remove this status after backend is updated
};

export const defaultTimeSlot: TimeSlotDto = {
	id: 0,
	fromTime: toSwissLocaleTimeString(new Date()),
	untilTime: toSwissLocaleTimeString(new Date()),
	boatId: 0,
	status: 'AVAILABLE', // Todo! remove this status after backend is updated
	bookingIds: undefined,
	availableSeats: 0,
	activityType: undefined,
};
