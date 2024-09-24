import { toSwissLocaleTimeString } from '../../lib/date-time.utils';
import { type ActivityTypeDto } from './activity-type.model';
import { type BoatDto } from './boat.model';
import { type BookingDto } from './booking.model';

export type TimeSlotDto = {
	id: number;
	fromTime?: string;
	untilTime?: string;
	boatId?: number;
	boat?: BoatDto;
	activityTypeId?: number;
	activityType?: ActivityTypeDto;
	bookings: BookingDto[];
	bookingIds?: Set<number>;
	availableSeats: number;
	seatsRider: number;
	seatsViewer: number;
	availableRiderSeats: number;
	availableViewerSeats: number;
	status: string; // Todo! remove this status after backend is updated
};

export const defaultTimeSlot: TimeSlotDto = {
	id: 0,
	fromTime: toSwissLocaleTimeString(new Date()),
	untilTime: toSwissLocaleTimeString(new Date()),
	boatId: 0,
	bookings: [],
	status: 'AVAILABLE', // Todo! remove this status after backend is updated
	bookingIds: undefined,
	availableSeats: 0,
	seatsRider: 0,
	seatsViewer: 0,
	availableRiderSeats: 0,
	availableViewerSeats: 0,
	activityType: undefined,
};
