import React from 'react';
import {useEpg, Epg, Layout} from 'planby';

const SchedulePage: React.FC = () => {
	const epg: Program[] = [
		{
			id: 'program-1',
			channelId: 'channel-1',
			title: 'Program 1',
			start: '2022-02-02T00:00:00',
			end: '2022-02-02T01:00:00',
			channelUuid: 'channel-1-uuid',
			description: 'Program 1 description',
			since: '2022-02-02T00:00:00',
			till: '2022-02-02T01:00:00',
			image: 'program-1-image-url',
		},
		{
			id: 'program-2',
			channelId: 'channel-2',
			title: 'Program 2',
			start: '2022-02-02T01:00:00',
			end: '2022-02-02T02:00:00',
			channelUuid: 'channel-2-uuid',
			description: 'Program 2 description',
			since: '2022-02-02T01:00:00',
			till: '2022-02-02T02:00:00',
			image: 'program-2-image-url',
		},
		// Add more programs as needed
	];

	const channels = [
		{
			id: 'channel-1',
			name: 'Channel 1',
			logo: 'https://via.placeholder.com/150',
		},
		{
			id: 'channel-2',
			name: 'Channel 2',
			logo: 'https://via.placeholder.com/150',
		},
		// Add more channels as needed
	];

	const {
		getEpgProps,
		getLayoutProps,
		onScrollToNow,
		onScrollLeft,
		onScrollRight,
	} = useEpg({
		epg,
		channels,
		startDate: '2022/02/02', // Or 2022-02-02T00:00:00
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
