import { type LocalizedStringDto } from './localized-string';

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
