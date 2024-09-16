import axios from 'axios';
import {type PersonDto} from '../models/api/person.model';

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

export const createPerson = async (person: PersonDto): Promise<PersonDto> => {
	const response = await axios.post<PersonDto>(`${baseUrl}/person`, person);
	return response.data;
};

export const getPersonById = async (id: number): Promise<PersonDto> => {
	const response = await axios.get<PersonDto>(`${baseUrl}/person/${id}`);
	return response.data;
};
