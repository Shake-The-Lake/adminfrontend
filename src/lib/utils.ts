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
	if (!object) {
		return '';
	}

	let translation = '';

	if (locale === 'en') {
		translation = object.en;
	} else if (locale === 'de') {
		translation = object.de;
	} else if (locale === 'gsw') {
		translation = object.swissGerman;
	}

	return translation ?? object.en; // Make english the default language
}

export function tryGetErrorMessage(error: unknown) {
	let errorMessage = 'An unknown error occurred';

	if (error && typeof error === 'object' && 'response' in error) {
		const axiosError = error as {
			response: {data?: string | {message?: string}; status: number};
		};
		const axiosMessage =
			typeof axiosError.response.data === 'string'
				? axiosError.response.data
				: axiosError.response.data?.message;
		errorMessage = `Error: ${axiosError.response.status} ${axiosMessage && '- ' + axiosMessage}`;
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
