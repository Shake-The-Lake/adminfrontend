import axios from 'axios';
import {type SearchParameterDto} from '../models/api/search.model';

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

export const getSearchParams = async (
	eventId: number,
): Promise<SearchParameterDto> => {
	const response = await axios.get<SearchParameterDto>(		`${baseUrl}/search/${eventId}`	);
	
	return response.data;
};
