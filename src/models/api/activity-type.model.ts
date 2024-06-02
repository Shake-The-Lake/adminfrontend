import {type LocalizedStringDto} from './localized-string';

export type ActivityTypeDto = {
	id: number;
	name?: LocalizedStringDto;
	description?: LocalizedStringDto;
	checklist?: LocalizedStringDto;
	icon?: string;
	eventId?: number;
};
