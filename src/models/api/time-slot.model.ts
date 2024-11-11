import {addOneHourToTime} from '../../lib/date-time.utils';
import {type ActivityTypeDto} from './activity-type.model';
import {type BaseModel} from './base.model';
import {type BoatDto} from './boat.model';
import {type BookingDto} from './booking.model';

export enum TimeSlotType {
	AVAILABLE = 'AVAILABLE',
	ON_BREAK = 'ON_BREAK',
}

export type TimeSlotDto = BaseModel & {
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
	status: TimeSlotType;
};

export const getDefaultTimeSlotBasedOnBoat = (boat: BoatDto): TimeSlotDto => ({
	id: 0,
	fromTime: boat.availableFrom,
	untilTime: addOneHourToTime(boat.availableFrom),
	boatId: boat.id,
	boat,
	activityTypeId: undefined,
	activityType: undefined,
	bookings: [],
	bookingIds: undefined,
	availableSeats: boat.seatsRider + boat.seatsViewer,
	seatsRider: boat.seatsRider,
	seatsViewer: boat.seatsViewer,
	availableRiderSeats: boat.seatsRider,
	availableViewerSeats: boat.seatsViewer,
	status: TimeSlotType.AVAILABLE,
});

export const getDefaultTimeSlotBasedOnPrevious = (previous: TimeSlotDto, boat: BoatDto): TimeSlotDto => ({
	...getDefaultTimeSlotBasedOnBoat(boat),
	fromTime: previous.untilTime,
	untilTime: addOneHourToTime(previous.untilTime),
	activityTypeId: previous.activityTypeId,
	activityType: previous.activityType,
	status: TimeSlotType.AVAILABLE,
});
