import {type ActivityTypeDto} from './activity-type.model';
import {type BoatDto} from './boat.model';

export type SearchParameterDto = {
	boats?: BoatDto[];
	activityTypes?: ActivityTypeDto[] ;
};

export type StlFilterParams = {
	searchTerm?: string;
	onSearchTermChange?: (searchTerm?: string) => void;
	activityTypeId?: number;
	onActivityTypeChange?: (activityTypeId?: number) => void;
	boatId?: number;
	onBoatChange?: (boatId?: number) => void;
	from?: string; // In HH:mm format
	onFromChange?: (from?: string) => void;
	to?: string; // In HH:mm format
	onToChange?: (to?: string) => void;
};

export const defaultFilterParams: StlFilterParams = {
	searchTerm: '',
	activityTypeId: undefined,
	boatId: undefined,
	from: '',
	to: '',
};
