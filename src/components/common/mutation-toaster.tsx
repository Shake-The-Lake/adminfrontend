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

const MutationToaster: React.FC<MutationToasterProps> = (props) => {
	useEffect(() => {
		// Todo! test a lot! is this one even necessary?
		if (props.error) {
			const message = tryGetErrorMessage(props.error);
			toast.error(getErrorMessageDependingOnType(props.type), {
				description: message,
			});
		}
	}, [props.error, props.isValidationError]);

	useEffect(() => {
		console.log(props);
		console.log(
			'Mutation Context:',
			props.mutation?.context,
			' | Mutation Data:',
			props.mutation?.data,
			' | Mutation Error:',
			props.mutation?.error,
			' | Failure Count:',
			props.mutation?.failureCount,
			' | Failure Reason:',
			props.mutation?.failureReason,
			' | Is Error:',
			props.mutation?.isError,
			' | Is Idle:',
			props.mutation?.isIdle,
			' | Is Paused:',
			props.mutation?.isPaused,
			' | Is Pending:',
			props.mutation?.isPending,
			' | Is Success:',
			props.mutation?.isSuccess,
			' | Mutation Status:',
			props.mutation?.status,
			' | Submitted At:',
			props.mutation?.submittedAt,
		);

		if (props.mutation?.isSuccess === true) {
			toast.success(getSuccessMessageDependingOnType(props.type));
		} else if (props.mutation?.isError === true) {
			const message = tryGetErrorMessage(props.mutation?.error);
			toast.error(
				getErrorMessageDependingOnType(props.type),
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
