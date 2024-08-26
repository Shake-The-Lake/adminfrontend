import {QueryClient} from '@tanstack/react-query';
import {
	type LoaderFunctionArgs,
	useLoaderData,
	useNavigate,
} from 'react-router-dom';
import React, {useState} from 'react';
import {z} from 'zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useCreatePerson} from '../../../queries/person';
import {useCreateBooking} from '../../../queries/booking';
import {
	timeslotsForEventOptions,
	useGetTimeSlotsForEvent,
} from '../../../queries/time-slot';
import {Button} from '../../../components/ui/button';
import {DataTable} from '../../../components/data-table/data-table';
import {useTranslation} from 'react-i18next';
import {timeSlotColumns} from './time-slot-columns';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../../components/ui/form';
import {Input} from '../../../components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../components/ui/select';
import {BookingDto} from '../../../models/api/booking.model';
import {PersonDto} from '../../../models/api/person.model';

const PersonSchema = z.object({
	id: z.number().optional(),
	firstName: z.string().min(1, 'First Name is required'),
	lastName: z.string().min(1, 'Last Name is required'),
	emailAddress: z.string().email('Invalid email format'),
	phoneNumber: z.string(),
	personType: z.enum(['EMPLOYEE', 'BOAT_DRIVER', 'CUSTOMER']),
});

type PersonFormSchema = z.infer<typeof PersonSchema>;

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
	const form = useForm<PersonFormSchema>({
		mode: 'onChange',
		defaultValues: {
			id: 0,
			firstName: '',
			lastName: '',
			emailAddress: '',
			phoneNumber: '',
			personType: 'CUSTOMER',
		},
		resolver: zodResolver(PersonSchema),
	});

	const {data: timeSlots, error} = useGetTimeSlotsForEvent(eventId);
	const {i18n} = useTranslation();
	const navigate = useNavigate();
	const createPersonMutation = useCreatePerson();
	const createBookingMutation = useCreateBooking(eventId);
	const [pagerNumber, setPagerNumber] = useState<number | null>(null);
	const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<number | null>(
		null,
	);
	const handleCancel = () => {
		navigate(`/event/${eventId}/bookings`);
	};

	const handleFormSubmit: SubmitHandler<PersonFormSchema> = async (values) => {
		if (!selectedTimeSlotId) {
			alert('Please select a time slot.');
			return;
		}

		try {
			const personData: PersonDto = {
				firstName: values.firstName,
				lastName: values.lastName,
				emailAddress: values.emailAddress,
				phoneNumber: values.phoneNumber,
				personType: values.personType,
			};

			const newPerson = await createPersonMutation.mutateAsync(personData);

			const bookingData: BookingDto = {
				isRider: false,
				isManual: false,
				pagerNumber: pagerNumber || undefined,
				personId: newPerson.id as number,
				timeSlotId: selectedTimeSlotId,
			};

			await createBookingMutation.mutateAsync(bookingData);
		} catch (error) {
			console.error('Failed to submit booking:', error);
		}
	};

	return (
		<div className="flex flex-col items-center h-full">
			<div className="w-full mb-8 flex justify-between items-center">
				<h1>Add Booking</h1>
			</div>

			<div className="w-full p-4 flex justify-center">
				<div className="flex flex-col w-full">
					<h3>Timeslots</h3>
					<div className="w-full">
						{error === null ? (
							<DataTable
								columns={timeSlotColumns(i18n.language, setSelectedTimeSlotId)}
								data={timeSlots ?? []}
							/>
						) : (
							<p>Failed to load timeslots!</p>
						)}
					</div>
				</div>
			</div>

			<div className="w-full flex mt-10">
				<div className="p-4">
					<h3>Person Data</h3>
					<p className="text-primary-dark-stroke mb-2 mt-2">
						Enter the contact data of the person wanting to do the booking.
					</p>
					<Form {...form}>
						<form
							id="personForm"
							className="p-1 space-y-4 w-full"
							onSubmit={form.handleSubmit(handleFormSubmit)}>
							<FormField
								name="firstName"
								control={form.control}
								render={({field}) => (
									<FormItem>
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input
												placeholder="First Name"
												{...field}
												className="input"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="lastName"
								control={form.control}
								render={({field}) => (
									<FormItem>
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Last Name"
												{...field}
												className="input"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="emailAddress"
								control={form.control}
								render={({field}) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="Email"
												{...field}
												className="input"
												type="email"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="phoneNumber"
								control={form.control}
								render={({field}) => (
									<FormItem>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<Input
												placeholder="Phone Number"
												{...field}
												className="input"
												type="tel"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="personType"
								control={form.control}
								render={({field}) => (
									<FormItem>
										<FormLabel>Person Type</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={field.onChange}>
												<SelectTrigger>
													<SelectValue placeholder="Select Person Type" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="EMPLOYEE">Employee</SelectItem>
													<SelectItem value="BOAT_DRIVER">
														Boat Driver
													</SelectItem>
													<SelectItem value="CUSTOMER">Customer</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormItem>
								<FormLabel>Pager Number</FormLabel>
								<FormControl>
									<Input
										placeholder="XC23832"
										className="input"
										type="number"
										value={pagerNumber || ''}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setPagerNumber(Number(e.target.value))
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						</form>
					</Form>
				</div>
			</div>

			<div className="flex w-full justify-end mt-auto p-4">
				<Button type="button" variant="secondary" onClick={handleCancel}>
					Cancel
				</Button>
				<Button type="submit" form="personForm" className="ml-4">
					Save
				</Button>
			</div>
		</div>
	);
};

export default AddBookingPage;
