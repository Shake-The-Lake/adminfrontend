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
	BookingOverview,
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
import {loader as bookingsLoader} from './pages/event/bookings/booking-overview';
import AddBookingPage from './pages/event/bookings/add-booking-page';
import LoginPage from './pages/login-page';

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
		path: '/login',
		element: <LoginPage />,
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
				element: <SchedulePage />,
			},
			{
				path: eventDetailRoutes.bookings,
				element: <BookingOverview />,
				loader: bookingsLoader(queryClient),
			},
			{
				path: `${eventDetailRoutes.bookings}/${eventDetailRoutes.addBooking}`,
				element: <AddBookingPage />,
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
