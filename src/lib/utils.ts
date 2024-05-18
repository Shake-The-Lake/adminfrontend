import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {type LocalizedStringDto} from '../models/api/localized-string';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getTranslation(locale: string, object: LocalizedStringDto): string {
	if (locale === 'en') return object.en;
	if (locale === 'de') return object.de;
	if (locale === 'swissGerman') return object.swissGerman;
	return '';
}
