import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {type LocalizedStringDto} from '../models/api/localized-string';
import {type FieldErrors, type SubmitErrorHandler} from 'react-hook-form';
import {toast} from 'sonner';
import {type UseMutationResult} from '@tanstack/react-query';
import {useEffect} from 'react';

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

// Todo! maybe put into better place?
export const onInvalidFormHandler: SubmitErrorHandler<any> = (
	errors: FieldErrors<any>,
) => {
	console.log('form has failed to submit on error, ', errors);

	toast.error('Could not be saved.', {
		description: 'There are validation errors in the form.',
	});
};

export const fromTimeToDateTime = (date: Date, time: string): Date => {
	// Get the current date
	const currentDate = new Date(date);

	// Split the time string into hours, minutes, and seconds
	const [hours, minutes, seconds] = time.split(':').map(Number);

	// Set the hours, minutes, and seconds of the current date
	currentDate.setHours(hours);
	currentDate.setMinutes(minutes);
	currentDate.setSeconds(seconds);
	currentDate.setMilliseconds(0);

	return currentDate;
};

export function useEmitSuccessIfSucceeded(onSuccessfullySubmitted: (() => void) | undefined, mutation: UseMutationResult<any, Error, any>) {
	useEffect(() => {
		if (onSuccessfullySubmitted &&
			mutation?.isSuccess &&
			Boolean(mutation.data?.id)) {
			onSuccessfullySubmitted();
		}
	}, [mutation?.isSuccess, mutation?.data?.id]);
}
