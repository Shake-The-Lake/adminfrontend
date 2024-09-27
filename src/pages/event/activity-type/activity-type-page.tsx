import React from 'react';
import {useTranslation} from 'react-i18next';
import ActivityTypeForm from '../../../components/forms/activity-type';
import {type LoaderFunctionArgs, useLoaderData} from 'react-router-dom';
import LoadingSpinner from '../../../components/animations/loading';
import {
	extractTypedInfoFromRouteParams,
	getTranslation,
} from '../../../lib/utils';
import {
	activityTypeDetailOptions,
	useActivityTypeDetail,
	useUpdateActivityType,
} from '../../../queries/activity-type';
import {type QueryClient} from '@tanstack/react-query';

export const loader =
	(queryClient: QueryClient) =>
		async ({params}: LoaderFunctionArgs) => {
			const routeIds = extractTypedInfoFromRouteParams(params);
			if (!routeIds.eventId) {
				throw new Error('No event ID provided');
			}

			if (!routeIds.activityTypeId) {
				throw new Error('No activity type ID provided');
			}

			await queryClient.ensureQueryData(
				activityTypeDetailOptions(routeIds.activityTypeId),
			);

			return routeIds;
		};

const ActivityTypePage: React.FC = () => {
	const {eventId, activityTypeId} = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;
	const {
		data: activityType,
		isPending,
		error,
	} = useActivityTypeDetail(activityTypeId, eventId);

	const updateMutation = useUpdateActivityType(activityTypeId);

	const {t, i18n} = useTranslation();

	return (
		<>
			<div className="flex flex-col items-center">
				<LoadingSpinner isLoading={isPending} />

				<h2 className="w-full mb-6">
					{t('activityType')} -{' '}
					{getTranslation(i18n.language, activityType?.name)}
				</h2>

				{error && <p>{t('activityType.errorLoadingActivityType')}</p>}
				{activityType && (
					<ActivityTypeForm
						key={activityType.id}
						mutation={updateMutation}
						model={activityType}
						isCreate={false}
					/>
				)}
			</div>
		</>
	);
};

export default ActivityTypePage;
