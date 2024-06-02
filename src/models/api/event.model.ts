import {type ActivityTypeDto} from './activity-type.model';
import {type BoatDto} from './boat.model';

export type EventDto = {
	id?: number;
	title: string;
	description: string;
	location: Location;
	date: string;
	// CustomerCode: string; not part of MVP
	// employeeCode: string; not part of MVP
	isStarted?: boolean;
	activityTypeIds?: number[];
	boatIds?: number[];
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
