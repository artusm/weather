export interface Coordinates {
    longitude: number;
    latitude: number;
}

export interface Forecast {
    timestamp: string;
    time: string;
    icon: string;
    temperature: number;
}