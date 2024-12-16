import React from 'react';
import SideNavigation from './navigation/side-navigation';
import { type LoaderFunctionArgs, Outlet, useLoaderData } from 'react-router-dom';
import HeaderEvent from './header/header-event';
import Footer from './footer/footer';
import { useTranslation } from 'react-i18next';
import {
	NavigationStructureContext,
	getNavigationItemsForEvent,
} from './navigation/navigation-models';
import {
	type QueryClient,
} from '@tanstack/react-query';
import { eventDetailOptions, useEventDetail } from '../queries/event';
import { extractTypedInfoFromRouteParams, type RouteParamsLoaderData } from '../lib/utils';

export const loader =
	(queryClient: QueryClient) =>
		async ({ params }: LoaderFunctionArgs) => {
			const routeIds = extractTypedInfoFromRouteParams(params);
			if (!routeIds.eventId) {
				throw new Error('No event ID provided');
			}

			await queryClient.ensureQueryData(
				eventDetailOptions(routeIds.eventId, true),
			);

			return routeIds;
		};

const EventDetailLayout: React.FC = () => {
	const { eventId } = useLoaderData() as RouteParamsLoaderData;

	const { data: event } = useEventDetail(eventId, true);
	const { i18n } = useTranslation();
	const navigationItems = getNavigationItemsForEvent(event, i18n.language);

	return (
		<NavigationStructureContext.Provider value={navigationItems}>
			<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
				<SideNavigation />
				<div className="flex flex-col">
					<HeaderEvent />
					<main className="flex flex-1 max-w-[100vw] flex-col gap-4 px-4 lg:gap-6 lg:py-6 lg:px-10 overflow-auto">
						<h1 className="mt-5 heading-m-upper text-primary">
							{event?.title}
						</h1>
						<Outlet />
					</main>
					<Footer />
				</div>
			</div>
		</NavigationStructureContext.Provider>
	);
};

export default EventDetailLayout;
