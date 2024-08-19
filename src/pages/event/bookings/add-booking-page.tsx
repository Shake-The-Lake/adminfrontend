import type {QueryClient} from '@tanstack/react-query';
import {LoaderFunctionArgs, useLoaderData} from 'react-router-dom';
import {useCreateBooking} from '../../../queries/booking';
import React from 'react';
import PersonForm from '../../../components/forms/person';
import {defaultPerson} from '../../../models/api/person.model';
import {useCreatePerson} from '../../../queries/person';
import BookingForm from '../../../components/forms/booking';
import {defaultBooking} from '../../../models/api/booking.model';
import {boatDetailOptions, useBoatDetail} from '../../../queries/boat';
import TimeSlots from '../boat/time-slots';

export const loader =
	(queryClient: QueryClient) =>
	async ({params}: LoaderFunctionArgs) => {
		if (!params.id) {
			throw new Error('No event ID provided');
		}

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
	const createPersonMutation = useCreatePerson();
	const createBookingMutation = useCreateBooking();
	const {data: boat, isPending, error} = useBoatDetail(boatId, eventId);

	return (
		<>
			<div className="flex flex-col items-center">
				<div className="w-full mb-8 flex justify-between items-center">
					<h1>Add Booking</h1>
				</div>
				<div className="w-full flex">
					<div className="w-1/2 p-4">
						<PersonForm
							model={{...defaultPerson}}
							mutation={createPersonMutation}
							isCreate={true}
						/>
					</div>
					<div className="w-px bg-gray-300"></div>¨
					<div className="w-1/2 p-4">
						<BookingForm
							model={{...defaultBooking}}
							mutation={createBookingMutation}
							isCreate={true}
						/>
					</div>
				</div>
				<div className="w-full p-4 flex justify-center mt-40">
					<TimeSlots {...boat}></TimeSlots>
				</div>
			</div>
		</>
	);
};

export default AddBookingPage;
