import { type BaseModel } from './base.model';
import { defaultPerson, type PersonDto } from './person.model';
import { type TimeSlotDto } from './time-slot.model';

export type BookingDto = BaseModel & {
	id?: number;
	isRider: boolean;
	isManual: boolean;
	pagerNumber?: number;
	personId?: number;
	person?: PersonDto;
	timeSlotId?: number;
	timeSlot?: TimeSlotDto;
};

export const defaultBooking: BookingDto = {
	id: 0,
	isRider: true,
	isManual: true,
	person: defaultPerson,
	pagerNumber: undefined,
	personId: 0,
	timeSlotId: 0,
};
