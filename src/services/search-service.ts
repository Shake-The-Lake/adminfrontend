import {type SearchParameterDto} from '../models/api/search.model';
import axiosInstance from './axiosInstance';

export const getSearchParams = async (
	eventId: number,
): Promise<SearchParameterDto> => {
	const response = await axiosInstance.get<SearchParameterDto>(`/search/${eventId}/parameters`);
	
	return response.data;
};
