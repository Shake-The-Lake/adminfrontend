import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation} from 'react-router-dom';
import {getEventById} from '../../../services/event-service';
import {createBoat, getBoatById} from '../../../services/boat-service';
import {BoatDto} from '../../../models/api/boat.model';
import StlCard from '../../../components/cards/card';
import StlDialog from '../../../components/dialog/dialog';
import BoatForm, {boatFormSchema} from '../../../components/forms/boat';
import type {SubmitHandler} from 'react-hook-form';
import {z} from 'zod';

const BoatsOverview: React.FC = () => {
	const {t} = useTranslation();
	const location = useLocation();
	const pathSegments = location.pathname.split('/');
	const eventId = pathSegments[pathSegments.length - 2];
	const [eventTitle, setEventTitle] = useState('');
	const [boats, setBoats] = useState<BoatDto[]>([]);

	const createNewBoat: SubmitHandler<z.infer<typeof boatFormSchema>> = (
		values,
	) => {
		const boat: BoatDto = {
			id: 0,
			name: values.boatName,
			boatDriverId: 1, // TODO handle logic for boatdrivers
			type: values.boatType,
			seatsRider: values.riderSeats,
			seatsViewer: values.viewerSeats,
			activityTypeId: 1, // TODO handle and discuss logic
			availableFrom: values.boatAvailableForm,
			availableUntil: values.boatAvailableUntil,
			eventId: Number(eventId),
		};
		try {
			const createdBoat = createBoat(boat);
			console.log('Created boat:', createdBoat);
		} catch (error) {
			console.error('Failed to create boat:', error);
		}
	};

	useEffect(() => {
		const fetchBoat = async () => {
			try {
				const event = await getEventById(Number(eventId));
				const boatIds = event.boatIds;
				setEventTitle(event.title);

				const fetchedBoats = await Promise.all(
					boatIds.map((id) => getBoatById(id)),
				);
				setBoats(fetchedBoats);
			} catch (error) {
				console.error('Error fetching boats:', error);
			}
		};
		fetchBoat();
	}, [eventId]);

	const deleteBoat = async (id: number) => {
		// TODO
		return true;
	};

	return (
		<div className="flex flex-col items-center py-10 px-10">
			<div className="w-full mb-10 flex flex-col justify-start">
				<h2 className="text-2xl font-bold">{eventTitle}</h2>
				<h2 className="mt-5">Boats</h2>
			</div>
			{boats.length === 0 ? (
				<div className="flex flex-col items-center justify-center w-full h-full">
					<p className="text-lg mb-4">{t('No boats yet')}</p>
					<StlDialog
						title="Create Boat"
						description="Add a new boat by entering the necessary data."
						triggerLabel="Add new boat"
						onSubmit={() =>
							document.querySelector('form')?.dispatchEvent(
								new Event('submit', {
									cancelable: true,
									bubbles: true,
								}),
							)
						}>
						<BoatForm onSubmit={createNewBoat} />
					</StlDialog>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
					{boats.map((boat) => (
						<div key={boat.id} className="mb-2 flex justify-center">
							<StlCard
								id={boat.id}
								title={boat.name}
								description={`Type: ${boat.type}, Seats (Rider): ${boat.seatsRider}, Seats (Viewer): ${boat.seatsViewer}`}
								path={`/boats/${boat.id}`}
								handleDelete={deleteBoat}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default BoatsOverview;
