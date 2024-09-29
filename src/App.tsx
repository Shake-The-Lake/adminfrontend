import React from 'react';
import {useTranslation} from 'react-i18next';
import './assets/i18n/i18n';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import DefaultLayout from './components/default-layout';
import {loader as sideNavigationLoader} from './components/event-detail-layout';
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
import ScheduleItemPage, {
	loader as scheduleLoaderItem,
} from './pages/event/schedule/schedule-item-page';
import {loader as scheduleLoader} from './pages/event/schedule/schedule-page';
import LoginPage from './pages/login-page';
import {AuthProvider} from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import AddBookingPage from './pages/event/bookings/add-booking-page';
import LoadingSpinner from './components/animations/loading';
import MutationLoader from './components/common/mutation-loader';
import EditBookingPage from './pages/event/bookings/edit-booking-page';

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
		errorElement: (
			<DefaultLayout>
				<ErrorPage />
			</DefaultLayout>
		),
	},
	{
		path: `/event/${eventDetailRoutes.id}`,
		element: <ProtectedRoute />,
		errorElement: (
			<DefaultLayout>
				<ErrorPage />
			</DefaultLayout>
		),
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
				path: `${eventDetailRoutes.schedule}/${eventDetailRoutes.timeSlotId}`,
				loader: scheduleLoaderItem(queryClient),
				element: <ScheduleItemPage />,
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
			{
				path: `${eventDetailRoutes.bookings}/${eventDetailRoutes.editBooking}`,
				element: <EditBookingPage />,
				loader: bookingsLoader(queryClient),
			},
		],
	},
]);

function App() {
	const {t} = useTranslation();

	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider
					router={router}
					fallbackElement={<LoadingSpinner isLoading />}
				/>
				<ReactQueryDevtools initialIsOpen={false} />
				<Toaster position="top-right" duration={5000} />
				<MutationLoader />
			</QueryClientProvider>
		</AuthProvider>
	);
}

export default App;
