export type EventDto = {
	id: number;
	title: string;
	description: string;
	location: Location;
	date: string;
	customerCode: string;
	employeeCode: string;
	customerOnlyTime: string;
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

export type NavigationEventDto = {
	id: number;
	title: string;
	activityTypes: NavigationActivityTypeDto[];
	boats: NavigationBoatDto[];
};

export type NavigationActivityTypeDto = {
	id: number;
	localizedName: string;
};

export type NavigationBoatDto = {
	id: number;
	name: string;
};
