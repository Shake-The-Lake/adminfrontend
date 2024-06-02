import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {type LocalizedStringDto} from '../models/api/localized-string';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getTranslation(
	locale: string,
	object?: LocalizedStringDto,
): string {
	if (!object) return '';
	if (locale === 'en') return object.en;
	if (locale === 'de') return object.de;
	if (locale === 'swissGerman') return object.swissGerman;
	return object.de; // Make german the default language
}

export function tryGetErrorMessage(error: unknown) {
	let errorMessage = 'An unknown error occurred';

	if (error && typeof error === 'object' && 'response' in error) {
		const axiosError = error as {
			response: {data?: {message?: string}; status: number};
		};
		errorMessage =
			axiosError.response.data?.message ??
			`Error: ${axiosError.response.status}`;
	} else if (error && typeof error === 'object' && 'request' in error) {
		const axiosError = error as {request: unknown};
		errorMessage = 'No response received from server';
	} else if (error instanceof Error) {
		// Handle a generic JavaScript error
		errorMessage = error.message;
	} else {
		// Handle other types of errors (if any)
		errorMessage = String(error);
	}

	return errorMessage;
}
