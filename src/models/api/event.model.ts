import {type ActivityTypeDto} from './activity-type.model';
import {type BoatDto} from './boat.model';

export type EventDto = {
	id?: number;
	title: string;
	description: string;
	location: Location;
	date: string; // Assuming ISO string format for LocalDateTime
	customerCode: string;
	employeeCode: string;
	customerOnlyTime: string; // Assuming ISO string format for LocalDateTime
	isStarted?: boolean;
	startedAt: string; // Assuming ISO string format for LocalDateTime
	endedAt: string; // Assuming ISO string format for LocalDateTime
	activityTypeIds?: Set<number>;
	boatIds?: Set<number>;
	boats?: BoatDto[] | undefined;
	activityTypes?: ActivityTypeDto[] | undefined;
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
