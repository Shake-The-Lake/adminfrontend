import React from 'react';
import {useTranslation} from 'react-i18next';
import {type LoaderFunctionArgs, useLoaderData} from 'react-router-dom';
import LoadingSpinner from '../../../components/animations/loading';
import BoatForm from '../../../components/forms/boat';
import TimeSlots from './time-slots';
import {Separator} from '../../../components/ui/separator';
import {type QueryClient} from '@tanstack/react-query';
import {
	boatDetailOptions,
	useBoatDetail,
	useUpdateBoat,
} from '../../../queries/boat';
import {extractTypedInfoFromRouteParams} from '../../../lib/utils';

export const loader =
	(queryClient: QueryClient) =>
		async ({params}: LoaderFunctionArgs) => {
			const routeIds = extractTypedInfoFromRouteParams(params);
			if (!routeIds.eventId) {
				throw new Error('No event ID provided');
			}

			if (!routeIds.boatId) {
				throw new Error('No boat ID provided');
			}

			await queryClient.ensureQueryData(boatDetailOptions(routeIds.boatId));
			return routeIds;
		};

const BoatPage: React.FC = () => {
	const {eventId, boatId} = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;
	const {data: boat, isPending, error} = useBoatDetail(boatId, eventId);

	const updateMutation = useUpdateBoat(boatId);

	const {t} = useTranslation();

	return (
		<>
			<div className="flex flex-col items-center">
				<LoadingSpinner isLoading={isPending || updateMutation.isPending} />

				<h2 className="w-full mb-6">
					{t('boat')} - {boat?.name}
				</h2>

				{error && <p>Error fetching Boat.</p>}
				{boat && (
					<BoatForm
						key={boat.id}
						mutation={updateMutation}
						model={boat}
						isCreate={false}
					/>
				)}
			</div>
			<Separator className="w-full my-10" />
			<TimeSlots {...boat}></TimeSlots>
		</>
	);
};

export default BoatPage;
