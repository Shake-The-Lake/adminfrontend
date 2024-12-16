import React from 'react';
import EntryValidationForm, {
	type entryValidationSchema,
} from '../forms/entry-validation';
import type { SubmitHandler } from 'react-hook-form';
import { type z } from 'zod';
import { Button } from '../ui/button';

const EntryValidation: React.FC = () => {
	const handleSubmit: SubmitHandler<
		z.infer<typeof entryValidationSchema>
	> = () => {
		// Implement API in case you ever want to re-introduce this feature instead of the auto-generated QR Codes
	};

	return (
		<div className="w-full lg:w-full pl-10 p-6 flex flex-col">
			<h1 className="text-2xl font-bold mb-4">Entry Validation Data</h1>
			<p className="mb-8 text-gray-600">
				Enter the entry validation data for the event. By entering the
				respective codes in the user app, a user will be able to sign up and
				book a boat ride. This code is automatically generated and unique over
				all events.
			</p>
			<div className="flex-grow space-y-4">
				<EntryValidationForm onSubmit={handleSubmit} />
				<div className="flex justify-end mt-4">
					<Button variant="outline" > Export to QR Code </Button>
				</div>
			</div>
		</div>
	);
};

export default EntryValidation;
