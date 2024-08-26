import {type ActivityTypeDto} from './activity-type.model';
import {type BoatDto} from './boat.model';

export type TimeSlotDto = {
	id: number;
	fromTime?: string; // Assuming ISO string format for LocalDateTime
	untilTime?: string; // Assuming ISO string format for LocalDateTime
	boatId?: number;
	boat?: BoatDto;
	activityType?: ActivityTypeDto;
	activityTypeId?: number;
	bookingIds?: Set<number>;
	status: string; // Todo! remove this status after backend is updated
};

export const defaultTimeSlot: TimeSlotDto = {
	id: 0,
	fromTime: new Date().toLocaleTimeString(),
	untilTime: new Date().toLocaleTimeString(),
	boatId: 0,
	status: 'AVAILABLE', // Todo! remove this status after backend is updated
	bookingIds: undefined,
	activityType: undefined,
};
