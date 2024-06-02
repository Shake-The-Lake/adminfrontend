import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import {getEventById} from '../../../services/event-service';
import {createBoat, deleteBoat} from '../../../services/boat-service';
import {defaultBoatDto, type BoatDto} from '../../../models/api/boat.model';
import StlCard from '../../../components/cards/stl-card';
import StlDialog from '../../../components/dialog/stl-dialog';
import BoatForm from '../../../components/forms/boat';

const BoatsOverview: React.FC = () => {
	const {id} = useParams<{id: string}>();
	const eventId = Number(id);

	const [boats, setBoats] = useState<BoatDto[]>([]);
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

	const {t} = useTranslation();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchBoat = async () => {
			try {
				const event = await getEventById(Number(eventId), 'boats');

				setBoats(event?.boats ?? []);
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

	const handleCreateNewBoat = async (dto: BoatDto) => {
		// Todo! trigger page reload after success
		try {
			const createdBoat = await createBoat(dto);
			console.log('Created boat:', createdBoat);

			setBoats([...boats, createdBoat]);
		} catch (error) {
			console.error('Failed to create activity type:', error);
			return false;
		}

		return true;
	};

	const openCreateDialog = () => {
		setIsCreateDialogOpen(true);
	};

	const closeCreateDialog = () => {
		setIsCreateDialogOpen(false);
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
					triggerLabel="Add new boat"
					isOpen={isCreateDialogOpen}
					onClose={closeCreateDialog}
					onOpen={openCreateDialog}>
					<BoatForm
						onSubmit={handleCreateNewBoat}
						onSuccessfullySubmitted={closeCreateDialog}
						model={defaultBoatDto}
						isCreate={false}
					/>
				</StlDialog>
			</div>
		</div>
	);
};

export default BoatsOverview;
