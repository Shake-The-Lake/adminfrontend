import axios from 'axios';
import {type ActivityTypeDto} from '../models/api/activity-type.model';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getAllActivityTypes = async (): Promise<ActivityTypeDto[]> => {
	const response = await axios.get<ActivityTypeDto[]>(`${baseUrl}/activitytype`);
	return response.data;
};

export const getActivityTypeById = async (id: number): Promise<ActivityTypeDto> => {
	const response = await axios.get<ActivityTypeDto>(`${baseUrl}/activitytype/${id}`);
	return response.data;
};

export const createActivityType = async (ActivityType: ActivityTypeDto): Promise<ActivityTypeDto> => {
	const response = await axios.post<ActivityTypeDto>(`${baseUrl}/activitytype`, ActivityType);
	return response.data;
};

export const deleteActivityType = async (id: number): Promise<void> => {
	await axios.delete(`${baseUrl}/activitytype/${id}`);
};
