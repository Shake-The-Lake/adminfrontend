import React from 'react';
import {z} from 'zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel} from '../ui/form';
import {Input} from '../ui/input';

export const entryValidationSchema = z.object({
	employeeEntryCode: z.string(),
	customerEntryCode: z.string(),
});

export type EntryFormschema = z.infer<typeof entryValidationSchema>;

type EntryValidationFormProps = {
	onSubmit: SubmitHandler<z.infer<typeof entryValidationSchema>>;
	defaultValues?: Partial<EntryFormschema>;
};

const EntryValidationForm: React.FC<EntryValidationFormProps> = ({
	onSubmit,
	defaultValues,
}) => {
	const entryValidationForm = useForm<z.infer<typeof entryValidationSchema>>({
		resolver: zodResolver(entryValidationSchema),
		mode: 'onChange',
		defaultValues,
	});

	return (
		<Form {...entryValidationForm}>
			<form
				className="p-1"
				onSubmit={entryValidationForm.handleSubmit(onSubmit)}>
				<FormField
					name="employeeEntryCode"
					control={entryValidationForm.control}
					render={({field}) => (
						<FormItem>
							<FormLabel>Employee Entry Code</FormLabel>
							<FormControl>
								<Input
									placeholder="Sommer Event 2024"
									{...field}
									className="input"
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name="customerEntryCode"
					control={entryValidationForm.control}
					render={({field}) => (
						<FormItem>
							<FormLabel>Customer Entry Code</FormLabel>
							<FormControl>
								<Input
									placeholder="Shake the Lake Event 2024"
									{...field}
									className="input"
								/>
							</FormControl>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default EntryValidationForm;
