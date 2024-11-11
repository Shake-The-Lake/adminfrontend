import {type BaseModel} from './base.model';

export type PersonDto = BaseModel &  {
	id?: number;
	personType: 'EMPLOYEE' | 'BOAT_DRIVER' | 'CUSTOMER';
	firstName: string;
	lastName: string;
	emailAddress: string;
	phoneNumber: string;
	bookingIds?: number[];
};

export const defaultPerson: PersonDto = {
	id: 0,
	personType: 'CUSTOMER',
	firstName: '',
	lastName: '',
	emailAddress: '',
	phoneNumber: '',
	bookingIds: [],
};
