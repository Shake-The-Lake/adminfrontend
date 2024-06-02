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

	const createNewBoat: SubmitHandler<z.infer<typeof boatFormSchema>> = async (
		values,
	) => {
		const boat: BoatDto = {
			id: 0,
			name: values.boatName,
			operator: values.boatDriver,
			type: values.boatType,
			seatsRider: values.riderSeats,
			seatsViewer: values.viewerSeats,
			activityTypeId: values.activityTypeId,
			availableFrom: values.boatAvailableForm,
			availableUntil: values.boatAvailableUntil,
			eventId: Number(eventId),
		};
		try {
			const createdBoat = await createBoat(boat);
			console.log('Created boat:', createdBoat);
			setBoats([...boats, createdBoat]);
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
			// Todo! add toasters in file
			const success = await deleteBoat(id);
			if (success) {
				setBoats((prevBoats) => prevBoats.filter((boat) => boat.id !== id));
				return true;
			}

			// If not success, fail
			console.error('Failed to delete boat');
		}

		return false;
	};

	return (
		<div className="flex flex-col items-center">
			<div className="w-full my-2 flex flex-col justify-start">
				<h1>Boats</h1>
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
					triggerLabel="Add new boat">
					<BoatForm onSubmit={createNewBoat} />
				</StlDialog>
			</div>
		</div>
	);
};

export default BoatsOverview;
