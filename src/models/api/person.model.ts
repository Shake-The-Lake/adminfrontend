export type PersonDto = {
	id?: number;
	personType: string;
	firstName: string;
	lastName: string;
	emailAddress: string;
	phoneNumber: string;
	bookingIds?: number[];
};

export const defaultPerson: PersonDto = {
	id: 0,
	personType: '',
	firstName: '',
	lastName: '',
	emailAddress: '',
	phoneNumber: '',
	bookingIds: [],
};
