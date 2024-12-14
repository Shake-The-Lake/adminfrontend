/* eslint-disable no-bitwise */
import React, { useEffect, useState } from 'react';
import StlFilter, { StlFilterOptions } from '../data-table/stl-filter';
import { DataTable } from '../data-table/data-table';
import { useTranslation } from 'react-i18next';
import { timeSlotColumns } from '../../pages/event/bookings/time-slot-columns';
import { TimeSlotType } from '../../models/api/time-slot.model';
import { useGetTimeSlotsForEvent } from '../../queries/time-slot';
import { type TimeSlotDto } from '../../models/api/time-slot.model';
import { defaultFilterParams, type StlFilterParams } from '../../models/api/search.model';

type BookingFormProps = {
	eventId: number;
	selectedTimeSlotId?: number;
	setSelectedTimeSlotId: (id: number | undefined) => void;
};

const SelectableTimeSlotList: React.FC<BookingFormProps> = ({
	eventId,
	selectedTimeSlotId,
	setSelectedTimeSlotId,
}) => {
	const { t, i18n } = useTranslation();
	const { data: timeSlots, error } = useGetTimeSlotsForEvent(eventId);
	const [filteredTimeSlots, setFilteredTimeSlots] = useState<TimeSlotDto[]>(
		() => timeSlots ?? [],
	);
	const [filter, setFilter] = useState<StlFilterParams>(defaultFilterParams);

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
			filter.activityTypeId,
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

		if (activityTypeId) {
			filtered = filtered.filter(
				(slot) => Number(slot.activityTypeId) === Number(activityTypeId),
			);
		}

		if (boatId) {
			filtered = filtered.filter(
				(slot) => Number(slot.boatId) === Number(boatId),
			);
		}

		if (from) {
			filtered = filtered.filter(
				(slot) => slot.fromTime && slot.fromTime >= from,
			);
		}

		if (to) {
			filtered = filtered.filter(
				(slot) => slot.untilTime && slot.untilTime <= to,
			);
		}

		return filtered.filter((slot) => slot.status !== TimeSlotType.ON_BREAK);
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
									setFilter((prevFilter) => ({ ...prevFilter, boatId }));
								},
								onFromChange(from?: string) {
									setFilter((prevFilter) => ({ ...prevFilter, from }));
								},
								onToChange(to?: string) {
									setFilter((prevFilter) => ({ ...prevFilter, to }));
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
							rowTestIdPrefix="bookings-time-slot-row"
							cellTestIdPrefix="bookings-time-slot-cell"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default SelectableTimeSlotList;
