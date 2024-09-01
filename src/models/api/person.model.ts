export type PersonDto = {
	id?: number;
	personType: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	bookingIds?: number[];
};
