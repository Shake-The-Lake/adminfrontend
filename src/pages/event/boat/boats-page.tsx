import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import {getEventById} from '../../../services/event-service';
import {createBoat, deleteBoat} from '../../../services/boat-service';
import {defaultBoatDto, type BoatDto} from '../../../models/api/boat.model';
import StlCard from '../../../components/cards/stl-card';
import StlDialog from '../../../components/dialog/stl-dialog';
import BoatForm from '../../../components/forms/boat';
import {tryGetErrorMessage} from '../../../lib/utils';
import LoadingSpinner from '../../../components/animations/loading';

const BoatsOverview: React.FC = () => {
	const {id} = useParams<{id: string}>();
	const eventId = Number(id);

	const [boats, setBoats] = useState<BoatDto[]>([]);
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

	const [loading, setLoading] = useState(true);

	const {t} = useTranslation();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchBoats = async () => {
			try {
				const event = await getEventById(Number(eventId), 'boats'); // Todo! move this wrapper to boat service

				setBoats(event?.boats ?? []);
			} catch (error) {
				console.error('Error fetching boats:', error);
			}

			setLoading(false);
		};

		fetchBoats()
			.then(() => 'obligatory for @typescript-eslint/no-floating-promises')
			.catch(() => 'obligatory for @typescript-eslint/no-floating-promises');
	}, [eventId]);

	const handleEdit = async (id?: number) => {
		navigate(`${id}`);
	};

	const handleDelete = async (id?: number) => {
		if (!id) {
			return false;
		}

		setLoading(true);

		try {
			await deleteBoat(id);
			setBoats((prevBoats) => prevBoats.filter((boat) => boat.id !== id));
		} catch (error) {
			console.error(error);
			setLoading(false);
			return tryGetErrorMessage(error);
		}

		setLoading(false);
		return true;
	};

	const handleCreateNewBoat = async (dto: BoatDto) => {
		// Todo! trigger page reload after success
		setLoading(true);

		try {
			const createdBoat = await createBoat(dto);

			setBoats([...boats, createdBoat]);
		} catch (error) {
			console.error('Failed to create boat:', error);
			setLoading(false);
			return tryGetErrorMessage(error);
		}

		setLoading(false);
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
			<LoadingSpinner isLoading={loading} />

			<div className="w-full mb-8 flex flex-col justify-start">
				<h1>Boats</h1>
			</div>
			{boats.length === 0 && (
				<div className="w-full py-5">
					<p className="text-lg">{t('No boats yet.')}</p>
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
				{boats.length > 0 &&
					boats.map((boat) => (
						<div key={boat.id} className="flex justify-center">
							<StlCard
								id={boat.id}
								title={boat.name}
								description={`Type: ${boat.type}, Seats (Rider): ${boat.seatsRider}, Seats (Viewer): ${boat.seatsViewer}`}
								onArrowClick={handleEdit}
								handleDelete={handleDelete}
							/>
						</div>
					))}
				<StlDialog
					title="Create Boat"
					description="Add a new boat by entering the necessary data."
					triggerLabel="Add new boat"
					isOpen={isCreateDialogOpen}
					formId="boat"
					onClose={closeCreateDialog}
					onOpen={openCreateDialog}>
					<BoatForm
						onSubmit={handleCreateNewBoat}
						onSuccessfullySubmitted={closeCreateDialog}
						model={defaultBoatDto}
						isCreate={true}
					/>
				</StlDialog>
			</div>
		</div>
	);
};

export default BoatsOverview;
