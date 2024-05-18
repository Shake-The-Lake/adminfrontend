import React from 'react';
import EntryValidationForm, {
	entryValidationSchema,
} from '../forms/entry-validation';
import type {SubmitHandler} from 'react-hook-form';
import {z} from 'zod';

const EntryValidation: React.FC = () => {
	const handleSubmit: SubmitHandler<
		z.infer<typeof entryValidationSchema>
	> = () => {
		// TODO Implement API
	};
	try {
	} catch (error) {}

	return (
		<div className="w-full lg:w-full pl-10 border rounded border-gray-200 p-6 flex flex-col">
			<h1 className="text-2xl font-bold mb-4">Entry Validation Data</h1>
			<p className="mb-8 text-gray-600">
				Enter the entry validation data for the event. By entering the
				respective codes in the user app, a user will be able to sign up and
				book a boat ride. This code is automatically generated and unique over
				all events.
			</p>
			<div className="flex-grow space-y-4">
				<EntryValidationForm onSubmit={handleSubmit} />
				<div className="flex justify-between mt-4">
					<button className="bg-primary text-white px-4 py-2 rounded-md">
						Start Event
					</button>
					<button className="bg-white text-black px-4 border border-gray-200 py-2 rounded-md">
						Export to QR Code
					</button>
				</div>
			</div>
		</div>
	);
};
export default EntryValidation;
