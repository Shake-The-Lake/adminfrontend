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
import {getActivityTypeById} from './services/activity-type-service';
import {getBoatById} from './services/boat-service';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {Toaster} from './components/ui/sonner';
import {loader as eventsLoader} from './pages/event/event-list';
import {loader as eventDetailLoader} from './pages/event/overview/event-overview';

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
			},
			{
				path: `${eventDetailRoutes.activityTypes}/${eventDetailRoutes.activityTypeId}`,
				element: <ActivityTypePage />,
				async loader({params}) {
					return getActivityTypeById(Number(params.activityTypeId));
				},
			},
			{
				path: eventDetailRoutes.boats,
				element: <BoatsOverview />,
			},
			{
				path: `${eventDetailRoutes.boats}/${eventDetailRoutes.boatId}`,
				element: <BoatPage />,
				async loader({params}) {
					return getBoatById(Number(params.boatId));
				},
			},
			{
				path: eventDetailRoutes.schedule,
				element: <SchedulePage />,
			},
			{
				path: eventDetailRoutes.bookings,
				element: <BookingsPage />,
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
