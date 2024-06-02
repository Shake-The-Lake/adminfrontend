import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router-dom';
import {getEventById} from '../../../services/event-service';
import {createBoat, deleteBoat} from '../../../services/boat-service';
import {type BoatDto} from '../../../models/api/boat.model';
import StlCard from '../../../components/cards/stl-card';
import StlDialog from '../../../components/dialog/stl-dialog';
import BoatForm, {type boatFormSchema} from '../../../components/forms/boat';
import type {SubmitHandler} from 'react-hook-form';
import {type z} from 'zod';

const BoatsOverview: React.FC = () => {
	const {t} = useTranslation();
	const location = useLocation();
	const navigate = useNavigate();
	const pathSegments = location.pathname.split('/');
	const eventId = pathSegments[pathSegments.length - 2];
	const [boats, setBoats] = useState<BoatDto[]>([]);

	const createNewBoat: SubmitHandler<z.infer<typeof boatFormSchema>> = (
		values,
	) => {
		const boat: BoatDto = {
			id: 0,
			name: values.boatName,
			boatDriverId: 1, // TODO handle logic for boatdrivers
			type: values.boatType,
			seatsRider: Number(values.riderSeats),
			seatsViewer: Number(values.viewerSeats),
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
				const event = await getEventById(Number(eventId), 'boats');

				setBoats(event.boats ?? []);
			} catch (error) {
				console.error('Error fetching boats:', error);
			}
		};

		fetchBoat()
			.then(() => 'obligatory for @typescript-eslint/no-floating-promises')
			.catch(() => 'obligatory for @typescript-eslint/no-floating-promises');
	}, [eventId]);

	const handleEdit = async (id?: number) => {
		navigate(`${id}`);
	};

	const removeBoat = async (id?: number) => {
		if (id) {
			return (await deleteBoat(id)) !== null;
		}

		return false;
	};

	return (
		<div className="flex flex-col items-center py-10 px-10">
			<div className="w-full my-5 flex flex-col justify-start">
				<h2>Boats</h2>
			</div>
			{boats.length === 0 && (
				<div className="w-full py-5">
					<p className="text-lg">{t('No boats yet.')}</p>
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
				{boats.map((boat) => (
					<div key={boat.id} className="mb-2 flex justify-center">
						<StlCard
							id={boat.id}
							title={boat.name}
							description={`Type: ${boat.type}, Seats (Rider): ${boat.seatsRider}, Seats (Viewer): ${boat.seatsViewer}`}
							handleEdit={handleEdit}
							handleDelete={removeBoat}
						/>
					</div>
				))}
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
		</div>
	);
};

export default BoatsOverview;
