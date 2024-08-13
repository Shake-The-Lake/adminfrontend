import React from 'react';
import {useTranslation} from 'react-i18next';
import './assets/i18n/i18n';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import DefaultLayout from './components/default-layout';
import EventDetailLayout from './components/event-detail-layout';
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
import {getEventById} from './services/event-service';
import {getActivityTypeById} from './services/activity-type-service';
import {getBoatById} from './services/boat-service';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

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
		children: [{index: true, element: <HomePage />}],
		errorElement: (
			<DefaultLayout>
				<ErrorPage />
			</DefaultLayout>
		),
	},
	{
		path: `/event/${eventDetailRoutes.id}`,
		element: <EventDetailLayout />,
		async loader({params}) {
			return getEventById(Number(params.id), 'boats,activityTypes');
		},
		children: [
			{
				index: true,
				element: <EventOverview />,
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
		</QueryClientProvider>
	);
}

export default App;
