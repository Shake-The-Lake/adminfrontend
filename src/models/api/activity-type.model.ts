import {type LocalizedStringDto} from './localized-string';
import {type BaseModel} from './base.model';

export type ActivityTypeDto = BaseModel & {
	id: number;
	name?: LocalizedStringDto;
	description?: LocalizedStringDto;
	checklist?: LocalizedStringDto;
	icon?: string;
	eventId?: number;
};

export const defaultActivityTypeDto: ActivityTypeDto = {
	id: 0,
	name: {
		en: '',
		de: '',
		swissGerman: '',
	},
	description: {
		en: '',
		de: '',
		swissGerman: '',
	},
	checklist: {
		en: '',
		de: '',
		swissGerman: '',
	},
	icon: '',
	eventId: 0,
};
