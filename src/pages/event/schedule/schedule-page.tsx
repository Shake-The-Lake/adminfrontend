/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import {
	useEpg,
	Epg,
	Layout,
	type Program,
	type Channel,
	type Theme,
} from 'planby';
import { type QueryClient } from '@tanstack/react-query';
import { useLoaderData, type LoaderFunctionArgs } from 'react-router-dom';
import { boatsOptions, useGetBoats } from '../../../queries/boat';
import { useEventDetail } from '../../../queries/event';
import { ProgramItem } from '../../../components/planby/program-item';
import { fromTimeToDateTime } from '../../../lib/date-time.utils';
import {
	extractTypedInfoFromRouteParams,
	getTranslation,
	type RouteParamsLoaderData,
} from '../../../lib/utils';
import { useTranslation } from 'react-i18next';
import PageTransitionFadeIn from '../../../components/animations/page-transition-fade-in';
import {
	timeslotsForEventOptions,
	useGetTimeSlotsForEvent,
} from '../../../queries/time-slot';
import { TimeSlotType } from '../../../models/api/time-slot.model';
import { TimeSlotCreateDialog } from '../boat/time-slots';

export const loader =
	(queryClient: QueryClient) =>
		async ({ params }: LoaderFunctionArgs) => {
			const routeIds = extractTypedInfoFromRouteParams(params);
			if (!routeIds.eventId) {
				throw new Error('No event ID provided');
			}

			await queryClient.ensureQueryData(
				boatsOptions(routeIds.eventId, queryClient),
			);

			await queryClient.ensureQueryData(
				timeslotsForEventOptions(routeIds.eventId),
			);

			return routeIds;
		};

const scheduleColors = [
	'var(--primary-blue)', // '#004D9F',
	'var(--primary-blue-dark)', // '#002650',
	'var(--primary-green)', // '#0EC8C8',
	'#6B46C1',
];

const breakScheduleColor = '#F48A4E';

const SchedulePage: React.FC = () => {
	const { eventId } = useLoaderData() as RouteParamsLoaderData;
	const { i18n, t } = useTranslation();

	const { data: event } = useEventDetail(eventId, false);
	const { data: boats } = useGetBoats(eventId);
	const { data: timeSlots } = useGetTimeSlotsForEvent(eventId);

	const mapColor = (type: number) => {
		const colorIndex = type % scheduleColors.length;
		return scheduleColors[colorIndex];
	};

	if (boats === undefined) {
		return <div>{t('schedule.addBoat')}</div>;
	}

	const programs: Program[] = Array.from(timeSlots ?? []).map((timeSlot) => {
		const isBreak = timeSlot?.status === TimeSlotType.ON_BREAK;
		const slotName = isBreak ? t('timeSlot.statusBreak') :
			getTranslation(i18n.language, timeSlot.activityType?.name) ?? '';
		const program: Program = {
			id: timeSlot.id.toString(),
			color: isBreak ? breakScheduleColor : mapColor(timeSlot?.activityTypeId ?? 0),
			disable: isBreak,
			title: slotName,
			channelId: timeSlot.boatId,
			channelUuid: timeSlot.boatId?.toString() ?? '',
			description: timeSlot.boat!.name,
			seatsViewer: timeSlot.boat!.seatsViewer,
			seatsRider: timeSlot.boat!.seatsRider,
			since: fromTimeToDateTime(
				event?.date ?? new Date(),
				timeSlot.fromTime ?? '',
			),
			till: fromTimeToDateTime(
				event?.date ?? new Date(),
				timeSlot.untilTime ?? '',
			),
			image: '',
		};

		return program;
	});

	const channels: Channel[] = boats.map((boat) => ({
		id: boat.id,
		name: boat.name,
		logo: 'https://via.placeholder.com/150',
		uuid: boat?.id?.toString() ?? '',
		position: { top: 0, height: 0 },
		boat,
	}));
	const { getEpgProps, getLayoutProps } = useEpg({
		epg: programs,
		channels,
		startDate: event?.date,
		theme: stlPlanByTheme,
		dayWidth: 4000,
	});

	return (
		<PageTransitionFadeIn className="flex justify-center">
			<div className="max-w-full md:max-w-[75vw]">
				<Epg {...getEpgProps()}>
					<Layout
						{...getLayoutProps()}
						renderProgram={({ program }) => (
							<ProgramItem key={program.data.id} program={program} />
						)}
						renderChannel={({ channel }) => (
							<div
								key={channel.uuid}
								className="w-full h-20 font-semibold text-right flex place-content-end items-center p-3 border-b last:border-none justify-between">
								<TimeSlotCreateDialog boat={channel.boat} timeSlots={undefined} isCreateFromSchedule={true}></TimeSlotCreateDialog>
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

const stlPlanByTheme: Theme = {
	primary: {
		600: '#002650',
		900: '#ffffff',
	},
	white: '#ffffff',
	green: {
		300: '#0EC8C8',
	},
	scrollbar: {
		// Scrollbar values don't matter as the global.css handles scrollbar
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
};
