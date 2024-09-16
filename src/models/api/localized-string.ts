export type LocalizedStringDto = {
	en: string;
	de: string;
	swissGerman: string;
};

export type LocalizedStringKey = keyof LocalizedStringDto;

export const defaultLocalizedStringDto: LocalizedStringDto = {
	en: '',
	de: '',
	swissGerman: '',
};
