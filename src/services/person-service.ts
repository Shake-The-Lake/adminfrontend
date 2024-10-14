import {type PersonDto} from '../models/api/person.model';
import axiosInstance from './axiosInstance';

export const createPerson = async (person: PersonDto): Promise<PersonDto> => {
	const response = await axiosInstance.post<PersonDto>('/person', person);
	return response.data;
};

export const getPersonById = async (id: number): Promise<PersonDto> => {
	const response = await axiosInstance.get<PersonDto>(`/person/${id}`);
	return response.data;
};

export const updatePerson = async (
	id: number,
	updatedData: Partial<PersonDto>,
) => {
	const response = await axiosInstance.put<PersonDto>(
		`/person/${id}`,
		updatedData,
	);
	return response.data;
};
