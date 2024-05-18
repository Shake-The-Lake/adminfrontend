import React from 'react';
import EntryValidationForm, {
	entryValidationSchema,
} from '../forms/entry-validation';
import type {SubmitHandler} from 'react-hook-form';
import {z} from 'zod';

const EntryValidation: React.FC = () => {
	const handleSubmit: SubmitHandler<
		z.infer<typeof entryValidationSchema>
	> = () => {};
	try {
	} catch (error) {}

	return (
		<div className="w-full lg:w-1/2 pl-10 border-l border-gray-200">
			<h1 className="text-2xl font-bold mb-4">Entry Validation Data</h1>
			<p className="mb-8 text-gray-600">
				Enter the entry validation data for the event. By entering the
				respective codes in the user app, a user will be able to sign up and
				book a boat ride. This code is automatically generated and unique over
				all events.
			</p>
			<div className="space-y-4">
				<EntryValidationForm onSubmit={handleSubmit} />
				<div className="flex space-x-4 mt-4">
					<button className="bg-blue-500 text-white px-4 py-2 rounded-md">
						Start Event
					</button>
					<button className="bg-gray-500 text-white px-4 py-2 rounded-md">
						Export to QR Code
					</button>
				</div>
			</div>
		</div>
	);
};
export default EntryValidation;
