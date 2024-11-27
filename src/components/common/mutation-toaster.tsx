import React from 'react';
import {useEffect} from 'react';
import {toast} from 'sonner';
import {tryGetErrorMessage} from '../../lib/utils';
import {type UseMutationResult} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';

type MutationToasterProps = {
	type: 'create' | 'update' | 'delete';
	mutation?: UseMutationResult<any, Error, any>; // First any is return type, second is input
};

const MutationToaster: React.FC<MutationToasterProps> = (props) => {
	useMutationToaster(props);

	return <></>;
};


function useMutationToaster({type, mutation}: MutationToasterProps) {
	const {t} = useTranslation();

	// Handle mutation status updates
	useEffect(() => {
		if (mutation?.isSuccess === true) {
			const messageKey = getSuccessMessageKeyDependingOnType(type);
			toast.success(t(messageKey));
		} else if (mutation?.isError === true) {
			const message = tryGetErrorMessage(mutation?.error);
			const messageKey = getErrorMessageKeyDependingOnType(type);
			toast.error(
				t(messageKey),
				mutation?.error && {
					description: message,
				},
			);
		}

		// Reset the mutation state to prevent repeated toasts
		mutation?.reset(); // Reset the state to only trigger a success message once, and not on navigating e.g.
	}, [mutation?.isSuccess, mutation?.isError, type]);

	return null; // This hook does not render UI
}

export {MutationToaster, useMutationToaster};

function getSuccessMessageKeyDependingOnType(
	type: 'create' | 'update' | 'delete',
) {
	switch (type) {
		case 'create':
			return 'messages.successCreate';
		case 'update':
			return 'messages.successUpdate';
		case 'delete':
			return 'messages.successDelete';
	}
}

function getErrorMessageKeyDependingOnType(
	type: 'create' | 'update' | 'delete',
) {
	switch (type) {
		case 'create':
			return 'messages.errorCreate';
		case 'update':
			return 'messages.errorUpdate';
		case 'delete':
			return 'messages.errorDelete';
	}
}
