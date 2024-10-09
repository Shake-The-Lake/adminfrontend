/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import {useEpg, Epg, Layout, type Program, type Channel} from 'planby';
import {useQueryClient, type QueryClient} from '@tanstack/react-query';
import {useLoaderData, type LoaderFunctionArgs} from 'react-router-dom';
import {boatsOptions, useGetBoats} from '../../../queries/boat';
import {useEventDetail} from '../../../queries/event';
import {ProgramItem} from '../../../components/planby/programm-item';
import {fromTimeToDateTime} from '../../../lib/date-time.utils';
import {extractTypedInfoFromRouteParams} from '../../../lib/utils';
import {useTranslation} from 'react-i18next';
import PageTransitionFadeIn from '../../../components/animations/page-transition-fade-in';

export const loader =
	(queryClient: QueryClient) =>
		async ({params}: LoaderFunctionArgs) => {
			const routeIds = extractTypedInfoFromRouteParams(params);
			if (!routeIds.eventId) {
				throw new Error('No event ID provided');
			}

			await queryClient.ensureQueryData(
				boatsOptions(routeIds.eventId, queryClient),
			);

			return routeIds;
		};

const SchedulePage: React.FC = () => {
	const {eventId} = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;
	const {data: boats} = useGetBoats(eventId);
	const {t} = useTranslation();
	const queryClient = useQueryClient();
	const {data: event} = useEventDetail(queryClient, eventId, false);

	const mapColor = (type: number) => {
		switch (type) {
			case 1:
				return '#0EC8C8';
			case 2:
				return '#6B46C1';
			case 3:
				return '#D53F8C';
			case 4:
				return '#FF0000';
			default:
				return '#002650';
		}
	};

	if (boats === undefined) {
		return <div>{t('schedule.addBoat')}</div>;
	}

	const program: Program[] = boats.flatMap((boat) =>
		Array.from(boat.timeSlots ?? []).map((timeSlot) => ({
			id: timeSlot.id.toString(),
			color: mapColor(timeSlot?.activityTypeId ?? 0),
			title: boat.name,
			channelId: boat.id,
			channelUuid: boat?.id?.toString() ?? '',
			description: '',
			since: fromTimeToDateTime(
				event?.date ?? new Date(),
				timeSlot.fromTime ?? '',
			),
			till: fromTimeToDateTime(
				event?.date ?? new Date(),
				timeSlot.untilTime ?? '',
			),
			image: '',
		})),
	);

	const channels: Channel[] = boats.map((boat) => ({
		id: boat.id,
		name: boat.name,
		logo: 'https://via.placeholder.com/150',
		uuid: boat?.id?.toString() ?? '',
		position: {top: 0, height: 0},
	}));
	const {getEpgProps, getLayoutProps} = useEpg({
		epg: program,
		channels,
		startDate: event?.date,
		theme: {
			primary: {
				600: '#002650',
				900: '#ffffff',
			},
			white: '#ffffff',
			green: {
				300: '#0EC8C8',
			},
			scrollbar: {
				border: '#e2e8f0',
				thumb: {
					bg: '#CBD5E1',
				},
			},
			gradient: {
				blue: {
					300: '#ffffff',
					600: '#CBD5E1',
					900: '#768BA5',
				},
			},
			text: {
				grey: {
					300: '#CBD5E1',
					500: '#768BA5',
				},
			},
			timeline: {
				divider: {
					bg: '#718096',
				},
			},
			grey: {
				300: '#e2e8f0',
			},
			loader: {
				teal: '#0EC8C8',
				purple: '#6B46C1',
				pink: '#D53F8C',
				bg: '#002650',
			},
		},
	});

	return (
		<PageTransitionFadeIn>
			<div className="max-w-full md:max-w-[75vw]">
				<Epg {...getEpgProps()}>
					<Layout
						{...getLayoutProps()}
						renderProgram={({program}) => (
							<ProgramItem key={program.data.id} program={program} />
						)}
						renderChannel={({channel}) => (
							<div
								key={channel.uuid}
								className="w-full h-full font-semibold py-4 px-3">
								{channel.name}
							</div>
						)}
					/>
				</Epg>
			</div>
		</PageTransitionFadeIn>
	);
};

export default SchedulePage;
