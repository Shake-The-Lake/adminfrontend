import React from 'react';
import {useEpg, Epg, Layout, type Program, type Channel} from 'planby';
import {type QueryClient} from '@tanstack/react-query';
import {useLoaderData, type LoaderFunctionArgs} from 'react-router-dom';
import {boatsOptions, useGetBoats} from '../../../queries/boat';
import {time} from 'console';
import {describe} from 'node:test';
import {Description} from '@radix-ui/react-toast';
import {fromTimeToCurrentDate} from '../../../lib/utils';

export const loader =
	(queryClient: QueryClient) =>
		async ({params}: LoaderFunctionArgs) => {
			if (!params.id) {
				throw new Error('No event ID provided');
			}

			await queryClient.ensureQueryData(
				boatsOptions(Number(params.id), queryClient),
			);

			return {
				eventId: Number(params.id),
			};
		};

const SchedulePage: React.FC = () => {
	const {eventId} = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;
	const {data: boats, isPending, error} = useGetBoats(eventId);

	if (boats === undefined) return <div>Add a boat</div>;

	const program: Program[] = boats.flatMap((boat) =>
		Array.from(boat.timeSlots ?? []).map((timeSlot) => ({
			id: timeSlot.id.toString(),
			title: boat.name,
			channelId: boat.id,
			channelUuid: boat.id.toString(),
			description: '',
			since: fromTimeToCurrentDate(timeSlot.fromTime ?? ''),
			till: fromTimeToCurrentDate(timeSlot.untilTime ?? ''),
			image: '',
		})),
	);
	console.log(program);
	const channels: Channel[] = boats.map((boat) => ({
	  id: boat.id,
	  name: boat.name,
	  logo: 'https://via.placeholder.com/150',
	  uuid: boat.id.toString(),
	  position: {top: 0, height: 0},
	}));

	const {
		getEpgProps,
		getLayoutProps,
		onScrollToNow,
		onScrollLeft,
		onScrollRight,
	} = useEpg({
		epg: program,
		channels,
		startDate: '2024-08-26',
	});

	return (
		<div>
			<div style={{height: '600px', width: '1200px'}}>
				<Epg {...getEpgProps()}>
					<Layout
						{...getLayoutProps()}
					/>
				</Epg>
			</div>
		</div>
	);
};

export default SchedulePage;
