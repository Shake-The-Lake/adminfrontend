export type EventDto = {
	id: number;
	title: string;
	description: string;
	location: Location;
	date: string;
	//customerCode: string; not part of MVP
	//employeeCode: string; not part of MVP
	boatIds: number[];
	isStarted: boolean;
};

export type Location = {
	id: number;
	name: string;
	street: string;
	streetNr: number;
	town: string;
	postalCode: number;
	canton: string;
};
