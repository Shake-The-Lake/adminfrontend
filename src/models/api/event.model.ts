export type EventDto = {
	id: number;
	title: string;
	description: string;
	location: Location;
	date: string;
	customerCode: string;
	employeeCode: string;
	customerOnlyTime: string;
	boatIds: number[];
	isStarted: boolean;
	startedAt: string;
	endedAt: string;
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
