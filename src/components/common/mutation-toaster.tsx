import React from 'react';
import {useEffect} from 'react';
import {toast} from 'sonner';
import {tryGetErrorMessage} from '../../lib/utils';
import {type UseMutationResult} from '@tanstack/react-query';

type MutationToasterProps = {
	type: 'create' | 'update' | 'delete';
	mutation?: UseMutationResult<any, Error, any>; // First any is return type, second is input
	error?: Error | undefined;
	isValidationError?: boolean;
};

const MutationToaster = ({...props}: MutationToasterProps) => {
	useEffect(() => {
		// Todo! test a lot!
		if (props.error) {
			const message = tryGetErrorMessage(props.error);
			toast.error(getErrorMessageDependingOnType(props.type), {
				description: message,
			});
		}
	}, [props.error, props.isValidationError]);

	useEffect(() => {
		console.log(props);
		if (props.mutation?.isSuccess === true) {
			toast.success(getSuccessMessageDependingOnType(props.type));
		}
	}, [props.mutation?.isSuccess]);

	// Todo! handle styling better, make error red
	return <></>;
};

export {MutationToaster};

function getSuccessMessageDependingOnType(
	type: 'create' | 'update' | 'delete',
) {
	switch (type) {
		case 'create':
			return 'Item was created successfully!';
		case 'update':
			return 'Item was saved successfully!';
		case 'delete':
			return 'Item was deleted successfully!';
	}
}

function getErrorMessageDependingOnType(type: 'create' | 'update' | 'delete') {
	switch (type) {
		case 'create':
			return 'There was an error when creating.';
		case 'update':
			return 'There was an error when saving.';
		case 'delete':
			return 'There was an error when deleting.';
	}
}
