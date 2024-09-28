import {type PersonDto} from './person.model';

export type BookingDto = {
	id?: number;
	isRider: boolean;
	isManual: boolean;
	pagerNumber?: number;
	personId: number;
	person?: PersonDto;
	timeSlotId: number;
};

export const defaultBooking: BookingDto = {
	id: 0,
	isRider: false,
	isManual: true,
	pagerNumber: undefined,
	personId: 0,
	timeSlotId: 0,
};
