import {type PersonDto} from './person.model';

export type BookingDto = {
	id?: number;
	isRider: boolean;
	isManual?: boolean;
	pagerNumber?: number;
	personId?: number;
	person?: PersonDto;
	timeSlotId?: number;
};

export const defaultBooking: BookingDto = {
	id: 0,
	isRider: false,
	isManual: true,
	pagerNumber: undefined,
	personId: 0,
	timeSlotId: 0,
};

export type CombinedBookingFormDto = {
	//person fields
	firstName: string;
	lastName: string;
	emailAddress: string;
	phoneNumber: string;
	personType: 'EMPLOYEE' | 'BOAT_DRIVER' | 'CUSTOMER';
	isRider: boolean;

	//booking fields
	isManual: boolean;
	pagerNumber?: number;
	timeSlotId: number | undefined;
};

export const defaultCombinedBooking: CombinedBookingFormDto = {
	firstName: '',
	lastName: '',
	emailAddress: '',
	phoneNumber: '',
	personType: 'CUSTOMER',
	isRider: true,
	isManual: true,
	pagerNumber: undefined,
	timeSlotId: undefined,
};
