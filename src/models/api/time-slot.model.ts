import {type ActivityTypeDto} from './activity-type.model';

export type TimeSlotDto = {
	id: number;
	fromTime?: Date; // Assuming ISO string format for LocalDateTime
	untilTime?: Date; // Assuming ISO string format for LocalDateTime
	boatId?: number;
	activityType?: ActivityTypeDto | undefined;
	bookingIds?: Set<number>;
	status: string; // Todo! remove this status after backend is updated
};

export const defaultTimeSlot: TimeSlotDto = {
	id: 0,
	fromTime: new Date(),
	untilTime: new Date(),
	boatId: 0,
	status: 'AVAILABLE', // Todo! remove this status after backend is updated
	bookingIds: undefined,
	activityType: undefined,
};
