import React from 'react';
import {useTranslation} from 'react-i18next';
import './assets/i18n/i18n';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import DefaultLayout from './components/default-layout';
import EventDetailLayout from './components/event-detail-layout';
import {eventDetailRoutes} from './constants';
import {
	ActivityTypePage,
	ActivityTypesPage,
	BoatPage,
	BoatsPage,
	BookingsPage,
	ErrorPage,
	EventOverview,
	HomePage,
	SchedulePage,
} from './pages';

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
		path: '/event',
		element: <EventDetailLayout />,
		children: [
			{index: true, element: <Navigate to="/" replace={true} />},
			{
				path: eventDetailRoutes.id,
				element: <EventOverview />,
			},
			{
				path: `${eventDetailRoutes.id}/${eventDetailRoutes.activityTypes}`,
				element: <ActivityTypesPage />,
			},
			{
				path: `${eventDetailRoutes.id}/${eventDetailRoutes.activityTypes}/${eventDetailRoutes.activityTypeId}`,
				element: <ActivityTypePage />,
			},
			{
				path: `${eventDetailRoutes.id}/${eventDetailRoutes.boats}`,
				element: <BoatsPage />,
			},
			{
				path: `${eventDetailRoutes.id}/${eventDetailRoutes.boats}/${eventDetailRoutes.boatId}`,
				element: <BoatPage />,
			},
			{
				path: `${eventDetailRoutes.id}/${eventDetailRoutes.schedule}`,
				element: <SchedulePage />,
			},
			{
				path: `${eventDetailRoutes.id}/${eventDetailRoutes.bookings}`,
				element: <BookingsPage />,
			},
		],
	},
]);

function App() {
	const {t} = useTranslation();
	return (
		<RouterProvider
			router={router}
			fallbackElement={<div>{t('loading')}</div>}
		/>
	);
}

export default App;
