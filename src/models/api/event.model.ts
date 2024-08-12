import {type ActivityTypeDto} from './activity-type.model';
import {type BoatDto} from './boat.model';

export type EventDto = {
	id?: number;
	title: string;
	description: string;
	// Location: Location; not part of MVP
	date: Date;
	// CustomerCode: string; not part of MVP
	// employeeCode: string; not part of MVP
	isStarted?: boolean;
	activityTypeIds?: number[];
	boatIds?: number[];
	boats?: BoatDto[] | undefined;
	activityTypes?: ActivityTypeDto[] | undefined;
};

export const defaultEventDto: EventDto = {
	id: 0,
	title: '',
	description: '',
	date: new Date(),
	isStarted: false,
	activityTypeIds: [],
	boatIds: [],
	boats: undefined,
	activityTypes: undefined,
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
