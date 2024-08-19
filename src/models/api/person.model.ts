export type PersonDto = {
	id?: number;
	personType: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: number;
	bookingIds?: number[];
};

export const defaultPerson: PersonDto = {
	id: 0,
	personType: '',
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: 0,
	bookingIds: [],
};
