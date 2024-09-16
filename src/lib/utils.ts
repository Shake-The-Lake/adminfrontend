import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {type LocalizedStringKey, type LocalizedStringDto} from '../models/api/localized-string';
import {type FieldErrors, type SubmitErrorHandler} from 'react-hook-form';
import {toast} from 'sonner';
import {type UseMutationResult} from '@tanstack/react-query';
import {useEffect} from 'react';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function localeToLocalizedStringProperty(locale: string): LocalizedStringKey {
	if (locale === 'gsw') {
		return 'swissGerman';
	}

	return locale as LocalizedStringKey;
}

export function getTranslation(
	locale: string,
	object?: LocalizedStringDto,
): string {
	if (!object) {
		return '';
	}

	const translation = object[localeToLocalizedStringProperty(locale)];

	if (translation) {
		return translation;
	}

	return object.en; // Make english the default language
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

export function useEmitSuccessIfSucceeded(
	onSuccessfullySubmitted: (() => void) | undefined,
	mutation: UseMutationResult<any, Error, any>,
) {
	useEffect(() => {
		if (
			onSuccessfullySubmitted &&
			mutation?.isSuccess &&
			Boolean(mutation.data?.id)
		) {
			onSuccessfullySubmitted();
		}
	}, [mutation?.isSuccess, mutation?.data?.id]);
}
