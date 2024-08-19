import type {QueryClient} from '@tanstack/react-query';
import {LoaderFunctionArgs, useLoaderData} from 'react-router-dom';
import React from 'react';
import PersonForm from '../../../components/forms/person';
import {defaultPerson} from '../../../models/api/person.model';
import {useCreatePerson} from '../../../queries/person';
import {boatDetailOptions} from '../../../queries/boat';
import {useGetTimeSlots} from '../../../queries/time-slot';
import {Button} from '../../../components/ui/button';

export const loader =
	(queryClient: QueryClient) =>
	async ({params}: LoaderFunctionArgs) => {
		if (!params.boatId) {
			throw new Error('No boat ID provided');
		}

		await queryClient.ensureQueryData(boatDetailOptions(Number(params.boatId)));
		return {
			eventId: Number(params.id),
			boatId: Number(params.boatId),
		};
	};

const AddBookingPage: React.FC = () => {
	const {eventId, boatId} = useLoaderData() as Awaited<
		ReturnType<ReturnType<typeof loader>>
	>;

	const {data: timeSlots} = useGetTimeSlots(boatId);
	const createPersonMutation = useCreatePerson();

	return (
		<>
			<div className="flex flex-col items-center">
				<div className="w-full mb-8 flex justify-between items-center">
					<h1>Add Booking</h1>
				</div>

				<div className="w-full p-4 flex justify-center">
					<div className="flex flex-col w-full">
						<h3>Timeslots</h3>
						//TODO
					</div>
				</div>
				<div className="w-full flex mt-20">
					<div className=" p-4">
						<h3>Person Data</h3>
						<p className="text-primary-dark-stroke mb-2 mt-2">
							Enter the contact data of the person wanting to do the booking.
						</p>
						<PersonForm
							model={{...defaultPerson}}
							mutation={createPersonMutation}
							isCreate={true}
						/>
					</div>
				</div>
				<div className="flex w-full flex-row justify-end gap-x-3">
					<Button>Cancel</Button>
					<Button type="submit">Save</Button>
				</div>
			</div>
		</>
	);
};

export default AddBookingPage;
