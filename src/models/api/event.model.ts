export interface EventDto {
    id: number;
    title: string;
    description: string;
    location: Location;
    date: string;
    customerCode: string;
    employeeCode: string;
    customerOnlyTime: string;
    isStarted: boolean;
    startedAt: string;
    endedAt: string;
}

export interface Location {
    id: number;
    name: string;
    street: string;
    streetNr: string;
    postalCode: number;
    town: string;
    canton: string;
}
