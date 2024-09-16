import React from 'react';
import {useTranslation} from 'react-i18next';
import './assets/i18n/i18n';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import DefaultLayout from './components/default-layout';
import EventDetailLayout, {
	loader as sideNavigationLoader,
} from './components/event-detail-layout';
import {eventDetailRoutes} from './constants';
import {
	ActivityTypePage,
	ActivityTypesPage,
	BoatPage,
	BoatsOverview,
	BookingsPage,
	ErrorPage,
	EventOverview,
	HomePage,
	SchedulePage,
} from './pages';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {Toaster} from './components/ui/sonner';
import {loader as eventsLoader} from './pages/event/event-list';
import {loader as eventDetailLoader} from './pages/event/overview/event-overview';
import {loader as activityTypesLoader} from './pages/event/activity-type/activity-types-page';
import {loader as activityTypeDetailLoader} from './pages/event/activity-type/activity-type-page';
import {loader as boatsLoader} from './pages/event/boat/boats-page';
import {loader as boatDetailLoader} from './pages/event/boat/boat-page';
import {loader as bookingsLoader} from './pages/event/bookings/bookings-page';
import ScheduleItemPage from './pages/event/schedule/schedule-item-page';
import {loader as scheduleLoader} from './pages/event/schedule/schedule-page';
import {loader as scheduleLoaderItem} from './pages/event/schedule/schedule-item-page';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60,
		},
	},
});

const router = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{index: true, element: <HomePage />, loader: eventsLoader(queryClient)},
		],
		errorElement: (
			<DefaultLayout>
				<ErrorPage />
			</DefaultLayout>
		),
	},
	{
		path: `/event/${eventDetailRoutes.id}`,
		element: <EventDetailLayout />,
		loader: sideNavigationLoader(queryClient),
		children: [
			{
				index: true,
				element: <EventOverview />,
				loader: eventDetailLoader(queryClient),
			},
			{
				path: eventDetailRoutes.activityTypes,
				element: <ActivityTypesPage />,
				loader: activityTypesLoader(queryClient),
			},
			{
				path: `${eventDetailRoutes.activityTypes}/${eventDetailRoutes.activityTypeId}`,
				element: <ActivityTypePage />,
				loader: activityTypeDetailLoader(queryClient),
			},
			{
				path: eventDetailRoutes.boats,
				element: <BoatsOverview />,
				loader: boatsLoader(queryClient),
			},
			{
				path: `${eventDetailRoutes.boats}/${eventDetailRoutes.boatId}`,
				element: <BoatPage />,
				loader: boatDetailLoader(queryClient),
			},
			{
				path: eventDetailRoutes.schedule,
				loader: scheduleLoader(queryClient),
				element: <SchedulePage />,
			},
			{
				path:`${eventDetailRoutes.schedule}/${eventDetailRoutes.scheduleId}`,
				loader: scheduleLoaderItem(queryClient),
				element: <ScheduleItemPage />,
			},
			{
				path: eventDetailRoutes.bookings,
				element: <BookingsPage />,
				loader: bookingsLoader(queryClient),
			},
		],
	},
]);

function App() {
	const {t} = useTranslation();

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider
				router={router}
				fallbackElement={<div>{t('loading')}</div>}
			/>
			<ReactQueryDevtools initialIsOpen={false} />
			<Toaster position="top-center" closeButton />
		</QueryClientProvider>
	);
}

export default App;
