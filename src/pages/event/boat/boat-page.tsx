import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useLoaderData} from 'react-router-dom';
import {type BoatDto} from '../../../models/api/boat.model';
import LoadingSpinner from '../../../components/animations/loading';
import BoatForm from '../../../components/forms/boat';
import {useToast} from '../../../components/ui/use-toast';
import {updateBoat} from '../../../services/boat-service';
import {tryGetErrorMessage} from '../../../lib/utils';

const BoatPage: React.FC = () => {
	const [boat, setBoat] = useState<BoatDto | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);
	const routeData = useLoaderData();
	const {toast} = useToast();

	useEffect(() => {
		setIsLoading(true);
		if (routeData) {
			setBoat(routeData as BoatDto);
			setIsLoading(false);
		} else {
			console.error('Error fetching boat');
		}
	}, [routeData]);

	const {t} = useTranslation();

	const handleUpdateBoat = async (dto: BoatDto) => {
		try {
			const updatedBoat = await updateBoat(boat?.id ?? 0, dto);
			console.log('Updated boat:', updatedBoat);
			// Todo! trigger page reload after success
		} catch (error) {
			console.error('Failed to update boat:', error);
			return tryGetErrorMessage(error);
		}

		return true;
	};

	return (
		<>
			<div className="flex flex-col items-center">
				<LoadingSpinner isLoading={isLoading} />

				<h2 className="w-full mb-6">
					{t('boat')} - {boat?.name}
				</h2>

				{boat && (
					<BoatForm
						key={boat.id}
						onSubmit={handleUpdateBoat}
						onSuccessfullySubmitted={() => {
							toast({
								description: 'Boat successfully saved.',
							});
						}}
						model={boat}
						isCreate={false}
					/>
				)}
			</div>
		</>
	);
};

export default BoatPage;
