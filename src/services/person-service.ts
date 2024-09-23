import {type PersonDto} from '../models/api/person.model';
import axiosInstance from './axiosInstance';

export const createPerson = async (person: PersonDto): Promise<PersonDto> => {
	const response = await axiosInstance.post<PersonDto>('/person', person);
	return response.data;
};
