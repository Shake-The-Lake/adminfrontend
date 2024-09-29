import React, {useEffect, useState} from 'react';
import StlFilter, {StlFilterOptions} from '../data-table/stl-filter';
import {DataTable} from '../data-table/data-table';
import {useTranslation} from 'react-i18next';
import {timeSlotColumns} from '../../pages/event/bookings/time-slot-columns';
import {useGetTimeSlotsForEvent} from '../../queries/time-slot';
import {TimeSlotDto} from '../../models/api/time-slot.model';

type BookingFormProps = {
	control: any;
	errors: any;
	eventId: number;
	selectedTimeSlotId?: number;
	setSelectedTimeSlotId: (id: number | undefined) => void;
};

const BookingForm: React.FC<BookingFormProps> = ({
	control,
	errors,
	eventId,
	selectedTimeSlotId,
	setSelectedTimeSlotId,
}) => {
	const {t, i18n} = useTranslation();
	const {data: timeSlots, error} = useGetTimeSlotsForEvent(eventId);
	const [filteredTimeSlots, setFilteredTimeSlots] = useState<TimeSlotDto[]>([]);
	const [filter, setFilter] = useState<{
		activityId?: number;
		boatId?: number;
		from?: string;
		to?: string;
	}>({});

	useEffect(() => {
		if (timeSlots) {
			updateFilteredTimeSlots();
		}
	}, [timeSlots, filter]);

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
			return (
				Number(hours) * 3600 + Number(minutes) * 60 + (Number(seconds) || 0)
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

	if (error) {
		return <p>{t('booking.errorLoadingBooking')}</p>;
	}

	return (
		<>
			<div className="w-full mt-4 mb-4 flex justify-center">
				<div className="flex flex-col w-full">
					<div>
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
									setFilter((prevFilter) => ({...prevFilter, boatId}));
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
					</div>
				</div>
			</div>
		</>
	);
};

export default BookingForm;
