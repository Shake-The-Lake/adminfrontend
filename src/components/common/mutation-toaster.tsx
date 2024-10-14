import React from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { tryGetErrorMessage } from '../../lib/utils';
import { type UseMutationResult } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

type MutationToasterProps = {
	type: 'create' | 'update' | 'delete';
	mutation?: UseMutationResult<any, Error, any>; // First any is return type, second is input
	error?: Error | undefined;
	isValidationError?: boolean;
};

const MutationToaster: React.FC<MutationToasterProps> = (props) => {
	const { t } = useTranslation();

	useEffect(() => {
		// Todo! test a lot! is this one even necessary?
		if (props.error) {
			const message = tryGetErrorMessage(props.error);
			toast.error(getErrorMessageKeyDependingOnType(props.type), {
				description: message,
			});
		}
	}, [props.error, props.isValidationError]);

	useEffect(() => {

		if (props.mutation?.isSuccess === true) {
			const messageKey = getSuccessMessageKeyDependingOnType(props.type);
			toast.success(t(messageKey));
		} else if (props.mutation?.isError === true) {
			const message = tryGetErrorMessage(props.mutation?.error);
			const messageKey = getErrorMessageKeyDependingOnType(props.type);
			toast.error(
				t(messageKey),
				props.mutation?.error && {
					description: message,
				},
			);
		}

		props.mutation?.reset(); // Reset the state to only trigger a success message once, and not on navigating e.g.
	}, [props.mutation?.isSuccess, props.mutation?.isError]);

	// Todo! handle styling better, make error red
	return <></>;
};

export { MutationToaster };

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
