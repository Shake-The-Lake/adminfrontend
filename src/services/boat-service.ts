import axios from 'axios';
import {type BoatDto} from '../models/api/boat.model';

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

export const getAllBoats = async (): Promise<BoatDto[]> => {
	const response = await axios.get<BoatDto[]>(`${baseUrl}/boat`);
	return response.data;
};

export const getBoatById = async (id: number): Promise<BoatDto> => {
	const response = await axios.get<BoatDto>(`${baseUrl}/boat/${id}`);
	return response.data;
};
