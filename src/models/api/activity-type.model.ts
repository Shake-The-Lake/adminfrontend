import {type LocalizedStringDto} from './localized-string';

export type ActivityTypeDto = {
	id: number;
	name?: LocalizedStringDto;
	description?: LocalizedStringDto;
	checklist?: LocalizedStringDto;
	icon?: string;
	eventId?: number;
};

export const defaultActivityTypeDto: ActivityTypeDto = {
	id: 0,
	name: undefined,
	description: undefined,
	checklist: undefined,
	icon: undefined,
	eventId: undefined,
};
