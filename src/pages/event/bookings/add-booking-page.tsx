import type {QueryClient} from '@tanstack/react-query';
import {type LoaderFunctionArgs, useLoaderData} from 'react-router-dom';
import React from 'react';
import PersonForm from '../../../components/forms/person';
import {defaultPerson} from '../../../models/api/person.model';
import {useCreatePerson} from '../../../queries/person';
import {
	timeslotsForEventOptions,
	useGetTimeSlotsForEvent,
} from '../../../queries/time-slot';
import {Button} from '../../../components/ui/button';
import {DataTable} from '../../../components/data-table/data-table';
import {timeSlotColumns} from '../../../models/api/time-slot.model';
import {useTranslation} from 'react-i18next';

export const loader =
	(queryClient: QueryClient) =>
		async ({params}: LoaderFunctionArgs) => {
			if (!params.id) {
				throw new Error('No event ID provided');
			}

			await queryClient.ensureQueryData(
				timeslotsForEventOptions(Number(params.id)),
			);
			return {
				eventId: Number(params.id),
			};
		};

const AddBookingPage: React.FC = () => {
	const {eventId} = useLoaderData() as Awaited<
	ReturnType<ReturnType<typeof loader>>
	>;

	const {data: timeSlots, isPending, error} = useGetTimeSlotsForEvent(eventId);

	const {i18n} = useTranslation();

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

						<div className="w-full">
							{error === null ? (
								<DataTable
									columns={timeSlotColumns(i18n.language)}
									data={timeSlots ?? []}
								/>
							) : (
								<p>Failed to load bookings!</p>
							)}
						</div>
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
