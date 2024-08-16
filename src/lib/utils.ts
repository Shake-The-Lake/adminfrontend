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

export function getTimeStringFromWholeDate(date: Date | undefined) {
	const validDate = date instanceof Date ? date : new Date(date);

	if (isNaN(validDate.getTime())) {
		// Handle invalid date object
		return '00:00';
	}

	const hours = String(validDate.getHours()).padStart(2, '0');
	const minutes = String(validDate.getMinutes()).padStart(2, '0');
	return `${hours}:${minutes}`;
}

export function getWholeDateFromTimeString(date: Date, timeString: string) {
	const [hours, minutes] = timeString.split(':').map(Number);
	date.setHours(hours);
	date.setMinutes(minutes);

	return date; // Todo! or maybe make completely new date
}

// Utility function to format date
export function formatDateTimeLocal(date: Date): string {
	const offset = date.getTimezoneOffset();
	const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
	return adjustedDate.toISOString().slice(0, 16);
}

export function formatTimeLocal(date: Date) {

	const hours = date.getHours();
	const minutes = date.getMinutes();

	return `${hours}:${minutes}`;
}
