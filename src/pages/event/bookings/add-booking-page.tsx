import React, {useEffect, useState} from 'react';
import {useLoaderData, useNavigate} from 'react-router-dom';
import {z} from 'zod';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useCreatePerson} from '../../../queries/person';
import {useCreateBooking} from '../../../queries/booking';
import {useGetTimeSlotsForEvent} from '../../../queries/time-slot';
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
import {type BookingDto} from '../../../models/api/booking.model';
import {defaultPerson, type PersonDto} from '../../../models/api/person.model';
import StlFilter, {
	StlFilterOptions,
} from '../../../components/data-table/stl-filter';
import {type TimeSlotDto} from '../../../models/api/time-slot.model';
import StlSelect from '../../../components/select/stl-select';
import {toast} from 'sonner';

const PersonSchema = z.object({
	id: z.number().optional(),
	firstName: z.string().min(1, 'First Name is required'),
	lastName: z.string().min(1, 'Last Name is required'),
	emailAddress: z.string().email('Invalid email format'),
	phoneNumber: z.string(),
	personType: z.enum(['EMPLOYEE', 'BOAT_DRIVER', 'CUSTOMER']),
	isRider: z.enum(['RIDER', 'VIEWER']),
});

type PersonFormSchema = z.infer<typeof PersonSchema>;

const AddBookingPage: React.FC = () => {
	const {eventId} = useLoaderData() as {eventId: number};
	const form = useForm<PersonFormSchema>({
		mode: 'onChange',
		defaultValues: defaultPerson,
		resolver: zodResolver(PersonSchema),
	});

	const {data: timeSlots, error} = useGetTimeSlotsForEvent(eventId);
	const {i18n} = useTranslation();
	const navigate = useNavigate();
	const createPersonMutation = useCreatePerson();
	const createBookingMutation = useCreateBooking(eventId);
	const [pagerNumber, setPagerNumber] = useState<number | undefined>(undefined);
	const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<
	number | undefined
	>(undefined);
	const [filteredTimeSlots, setFilteredTimeSlots] = useState<TimeSlotDto[]>([]);
	const [filter, setFilter] = useState<{
		activityId?: number;
		boatId?: number;
		from?: string;
		to?: string;
	}>({
		activityId: undefined,
		boatId: undefined,
		from: undefined,
		to: undefined,
	});

	const handleCancel = () => {
		navigate(`/event/${eventId}/bookings`);
	};

	const filterTimeSlots = (
		timeSlots: TimeSlotDto[],
		activityTypeId?: number,
		boatId?: number,
		from?: string,
		to?: string,
	): TimeSlotDto[] => {
		let filtered = timeSlots;

		if (activityTypeId !== undefined && activityTypeId !== null) {
			filtered = filtered.filter(
				(slot) => Number(slot.activityTypeId) === Number(activityTypeId),
			);
		}

		if (boatId !== undefined && boatId !== null) {
			filtered = filtered.filter(
				(slot) => Number(slot.boatId) === Number(boatId),
			);
		}

		const parseTime = (timeString: string) => {
			if (!timeString) return null;

			const [hours, minutes, seconds] = timeString.split(':');
			const [wholeSeconds, milliseconds] = seconds
				? seconds.split('.')
				: [0, 0];
			return (
				Number(hours) * 3600 +
				Number(minutes) * 60 +
				Number(wholeSeconds) +
				(Number(milliseconds) || 0) / 1000
			);
		};

		if (from) {
			const fromTimeValue = parseTime(from);
			if (fromTimeValue !== null) {
				filtered = filtered.filter(
					(slot) => slot.fromTime && parseTime(slot.fromTime)! >= fromTimeValue,
				);
			}
		}

		if (to) {
			const toTimeValue = parseTime(to);
			if (toTimeValue !== null) {
				filtered = filtered.filter(
					(slot) => slot.untilTime && parseTime(slot.untilTime)! <= toTimeValue,
				);
			}
		}

		return filtered;
	};

	const updateFilteredTimeSlots = () => {
		const timeslotsWithAvailableSeats = timeSlots?.filter(
			(slot) => slot.availableSeats > 0,
		);
		const filtered = filterTimeSlots(
			timeslotsWithAvailableSeats ?? [],
			filter.activityId,
			filter.boatId,
			filter.from,
			filter.to,
		);
		setFilteredTimeSlots(filtered);
	};

	useEffect(() => {
		updateFilteredTimeSlots();
	}, [timeSlots, filter]);

	const handleFormSubmit: SubmitHandler<PersonFormSchema> = async (values) => {
		if (!selectedTimeSlotId) {
			toast.error('Please select a time slot.');
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
				isRider: values.isRider === 'RIDER',
				isManual: false,
				pagerNumber,
				personId: newPerson.id!,
				timeSlotId: selectedTimeSlotId,
			};

			await createBookingMutation.mutateAsync(bookingData);
			toast.success('Booking created successfully!');

			navigate(`/event/${eventId}/bookings`);
		} catch (error) {
			toast.error('Failed to submit booking: ');
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
							<>
								<StlFilter
									options={
										StlFilterOptions.ActivityType |
										StlFilterOptions.Boat |
										StlFilterOptions.TimeRange
									}
									params={{
										onActivityTypeChange(activityTypeId?: number) {
											setFilter((prevFilter) => ({
												...prevFilter,
												activityId: activityTypeId,
											}));
										},
										onBoatChange(boatId?: number) {
											console.log('Boat ID changed:', boatId);
											setFilter((prevFilter) => {
												const newFilter = {...prevFilter, boatId};
												console.log('Updated filter:', newFilter);
												return newFilter;
											});
										},
										onFromChange(from?: string) {
											setFilter((prevFilter) => ({...prevFilter, from}));
										},
										onToChange(to?: string) {
											setFilter((prevFilter) => ({...prevFilter, to}));
										},
									}}
								/>
								<DataTable
									columns={timeSlotColumns(
										i18n.language,
										setSelectedTimeSlotId,
										selectedTimeSlotId,
									)}
									data={filteredTimeSlots}
								/>
							</>
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
											<StlSelect
												value={field.value}
												onValueChange={field.onChange}
												list={[
													{key: 'EMPLOYEE', label: 'Employee'},
													{key: 'BOAT_DRIVER', label: 'Boat Driver'},
													{key: 'CUSTOMER', label: 'Customer'},
												]}
												getKey={(item) => item?.key}
												getLabel={(item) => item?.label ?? ''}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="isRider"
								control={form.control}
								render={({field}) => (
									<FormItem>
										<FormLabel>Rider</FormLabel>
										<FormControl>
											<StlSelect
												value={field.value}
												onValueChange={field.onChange}
												list={[
													{key: 'RIDER', label: 'Yes'},
													{key: 'VIEWER', label: 'No'},
												]}
												getKey={(item) => item?.key}
												getLabel={(item) => item?.label ?? ''}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormItem>
								<FormLabel>Pager Number</FormLabel>
								<FormControl>
									<Input
										placeholder="0"
										className="input"
										type="number"
										value={pagerNumber ?? ''}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											setPagerNumber(Number(e.target.value));
										}}
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
