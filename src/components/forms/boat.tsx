import React from 'react';
import {z} from 'zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Form, FormControl, FormField, FormItem, FormLabel} from '../ui/form';
import {Input} from '../ui/input';

export const boatFormSchema = z.object({
	boatName: z.string().min(5).max(20),
	boatDriver: z.string(),
	boatType: z.string(),
	riderSeats: z.string(),
	viewerSeats: z.string(),
	//slotDuration: z.number(), will be added later on
	activityTypes: z.string().array(),
	boatAvailableForm: z.string(),
	boatAvailableUntil: z.string(),
});

export type BoatFormSchema = z.infer<typeof boatFormSchema>;

type BoatFormProps = {
	onSubmit: SubmitHandler<z.infer<typeof boatFormSchema>>;
	defaultValues?: Partial<BoatFormSchema>;
};

const BoatForm: React.FC<BoatFormProps> = ({onSubmit, defaultValues}) => {
	const form = useForm<z.infer<typeof boatFormSchema>>({
		//resolver: zodResolver(boatFormSchema), Form Validation errors are currently not handelt correctly with popups or notifications -> if validations errors -> onSubmit won't do anything
		mode: 'onChange',
		defaultValues,
	});

	return (
		<Form {...form}>
			<form className="p-1 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					name="boatName"
					control={form.control}
					render={({field}) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Poseidon" {...field} className="input" />
							</FormControl>
						</FormItem>
					)}
				/>

				{/*TODO: define logic for handling driver selection and possible creation of new driver*/}
				{/*				<FormField
					name="boatDriver"
					control={form.control}
					render={({field}) => (
						<FormItem>
							<FormLabel>Boat Driver</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} className="input" />
							</FormControl>
						</FormItem>
					)}
				/>*/}
				<FormField
					name="boatType"
					control={form.control}
					render={({field}) => (
						<FormItem>
							<FormLabel>Boat Type</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} className="input" />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					name="riderSeats"
					control={form.control}
					render={({field}) => (
						<FormItem>
							<FormLabel>Max available seats for riders</FormLabel>
							<FormControl>
								<Input placeholder="0" {...field} className="input" />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					name="viewerSeats"
					control={form.control}
					render={({field}) => (
						<FormItem>
							<FormLabel>Max available seats for viewers</FormLabel>
							<FormControl>
								<Input placeholder="0" {...field} className="input" />
							</FormControl>
						</FormItem>
					)}
				/>

				{/* TODO Define logic here as well */}
				{/*				<FormField
					name="activityTypes"
					control={form.control}
					render={({field}) => (
						<FormItem>
							<FormLabel>Activity Types</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} className="input" />
							</FormControl>
						</FormItem>
					)}
				/>*/}

				<FormField
					name="boatAvailableForm"
					control={form.control}
					render={({field}) => (
						<FormItem>
							<FormLabel>Boat Available From</FormLabel>
							<FormControl>
								<Input type="datetime-local" {...field} className="input" />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					name="boatAvailableUntil"
					control={form.control}
					render={({field}) => (
						<FormItem>
							<FormLabel>Boat Available Until</FormLabel>
							<FormControl>
								<Input type="datetime-local" {...field} className="input" />
							</FormControl>
						</FormItem>
					)}
				/>
				<button type="submit" style={{display: 'none'}} />
			</form>
		</Form>
	);
};

export default BoatForm;
