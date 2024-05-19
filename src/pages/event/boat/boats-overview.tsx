import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation} from 'react-router-dom';
import {getEventById} from '../../../services/event-service';
import {getBoatById} from '../../../services/boat-service';
import {BoatDto} from '../../../models/api/boat.model';
import StlCard from '../../../components/cards/card';
import {Button} from '../../../components/ui/button';

const BoatsOverview: React.FC = () => {
	const {t} = useTranslation();
	const location = useLocation();
	const pathSegments = location.pathname.split('/');
	const eventId = pathSegments[pathSegments.length - 2];
	const [boats, setBoats] = useState<BoatDto[]>([]);

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const event = await getEventById(Number(eventId));
				const boatIds = event.boatIds;

				const fetchedBoats = await Promise.all(
					boatIds.map((id) => getBoatById(id)),
				);
				setBoats(fetchedBoats);
			} catch (error) {
				console.error('Error fetching boats:', error);
			}
		};
		fetchEvent();
	}, [eventId]);

	const handleCreateNewBoat = async () => {
		// TODO
		return;
	};

	const handleDelete = async (id: number) => {
		// TODO
		return true;
	};

	return (
		<div className="flex flex-col items-center py-10 px-10">
			<div className="flex justify-between items-center w-full mb-8">
				<h1 className="text-2xl font-bold">{t('boats')}</h1>
				<Button
					onClick={handleCreateNewBoat}
					className="bg-primary text-white px-4 py-2 rounded-md">
					{t('Add Boat')}
				</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
				{boats.map((boat) => (
					<div key={boat.id} className="mb-4 flex justify-center">
						<StlCard
							id={boat.id}
							title={boat.name}
							description={`Type: ${boat.type}, Seats (Rider): ${boat.seatsRider}, Seats (Viewer): ${boat.seatsViewer}`}
							path={`/boats/${boat.id}`}
							handleDelete={handleDelete}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default BoatsOverview;
