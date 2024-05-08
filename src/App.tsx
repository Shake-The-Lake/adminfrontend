import React from 'react';
import {useTranslation} from 'react-i18next';
import './assets/i18n/i18n';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventDetailLayout from './components/event-detail-layout';
import DefaultLayout from './components/main-layout';
import EventOverview from './pages/event/event-overview';
import {eventDetailRoutes} from './constants';

const router = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		children: [{index: true, element: <HomePage />}],
	},
	{
		path: '/event',
		element: <EventDetailLayout />,
		children: [
			{
				path: ':id',
				element: <EventOverview />,
				children: [
					{
						path: eventDetailRoutes.activityTypes,
						element: <EventOverview />,
						children: [{path: ':activityTypeId', element: <EventOverview />}],
					},
					{
						path: eventDetailRoutes.boats,
						element: <EventOverview />,
						children: [{path: ':boatId', element: <EventOverview />}],
					},
					{path: eventDetailRoutes.schedule, element: <EventOverview />},
					{path: eventDetailRoutes.bookings, element: <EventOverview />},
				],
			},
			{index: true, element: <EventOverview />}, // Todo! no index??
		],
	},
]);

// If (import.meta.hot) {
// import.meta.hot.dispose(() => router.dispose());
// }

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
