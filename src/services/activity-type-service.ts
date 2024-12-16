import {type ActivityTypeDto} from '../models/api/activity-type.model';
import sortBy from 'lodash-es/sortBy';
import axiosInstance from './axiosInstance';
import {getI18n} from 'react-i18next';
import {getTranslation} from '../lib/utils';

export const getSortedActivityTypes = (activityTypes?: ActivityTypeDto[]) => {
	const i18n = getI18n();

	return activityTypes
		? sortBy(activityTypes, [
			(a) => getTranslation(i18n.language, a.name).toLowerCase(),
			(a) => getTranslation(i18n.language, a.description).toLowerCase(),
		])
		: [];
};

export const getAllActivityTypesFromEvent = async (
	eventId: number,
): Promise<ActivityTypeDto[]> => {
	const response = await axiosInstance.get<ActivityTypeDto[]>('/activitytype');
	const result = response.data.filter(
		(activityType) => activityType.eventId === eventId,
	);

	return getSortedActivityTypes(result);
};

export const getActivityTypeById = async (
	id: number,
): Promise<ActivityTypeDto> => {
	const response = await axiosInstance.get<ActivityTypeDto>(
		`/activitytype/${id}`,
	);
	return response.data;
};

export const createActivityType = async (
	activityType: ActivityTypeDto,
): Promise<ActivityTypeDto> => {
	const response = await axiosInstance.post<ActivityTypeDto>(
		'/activitytype',
		activityType,
	);
	return response.data;
};

export const updateActivityType = async (
	id: number,
	activityType: ActivityTypeDto,
): Promise<ActivityTypeDto> => {
	const response = await axiosInstance.put<ActivityTypeDto>(
		`/activitytype/${id}`,
		activityType,
	);
	return response.data;
};

export const deleteActivityType = async (id: number): Promise<void> => {
	await axiosInstance.delete(`/activitytype/${id}`);
};
