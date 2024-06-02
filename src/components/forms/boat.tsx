import React, {useEffect, useState} from 'react';
import {z} from 'zod';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Form, FormControl, FormField, FormItem, FormLabel} from '../ui/form';
import {Input} from '../ui/input';
import {getAllActivityTypes} from '../../services/activity-type-serivce';
import {ActivityTypeDto} from '../../models/api/activity-type.model';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

export const boatFormSchema = z.object({
	boatName: z.string().min(5).max(20),
	boatDriver: z.string(),
	boatType: z.string(),
	riderSeats: z.string(),
	viewerSeats: z.string(),
	activityTypeId: z.number(),
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
		mode: 'onChange',
		defaultValues,
	});

	const [activityTypes, setActivityTypes] = useState<ActivityTypeDto[]>([]);

	useEffect(() => {
		const fetchActivityTypes = async () => {
			try {
				const response = await getAllActivityTypes();
				setActivityTypes(response);
			} catch (error) {
				console.error('Failed to fetch activity types:', error);
			}
		};

		fetchActivityTypes();
	}, []);

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

				<FormField
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
				/>
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

				<Controller
					name="activityTypeId"
					control={form.control}
					render={({field}) => (
						<FormItem>
							<FormLabel>Activity Types</FormLabel>
							<FormControl>
								<Select
									value={field.value ? field.value.toString() : ''}
									onValueChange={(value) => field.onChange(Number(value))}>
									<SelectTrigger className="w-full text-left p-2 border border-gray-300 rounded-md">
										<SelectValue placeholder="Select Activity Type">
											{field.value
												? activityTypes.find((type) => type.id === field.value)
														?.name?.en
												: 'Select Activity Type'}
										</SelectValue>
									</SelectTrigger>
									<SelectContent className="w-full border border-gray-300 rounded-md mt-1">
										{activityTypes.map((type) => (
											<SelectItem key={type.id} value={type.id.toString()}>
												{type.name?.en}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>

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
