import { Forecast } from '../types';

const now = () => new Date();

const addHours = (date: Date, hours: number) => {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);

    return date;
};

const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

const getTime = (timestamp: string) => {
    const date = new Date(timestamp);

    return [date.getHours(), date.getMinutes()].map(formatTime).join(':');
};

interface FromatOptions {
    interval: number;
    maxItems: number;
}

interface Timeserie {
    time: string;
    data: {
        next_1_hours: {
            summary: {
                symbol_code: string;
            };
        };
        instant: {
            details: {
                air_temperature: number;
            };
        };
    };
}
interface ApiResponse {
    properties: {
        timeseries: Timeserie[];
    };
}

function isApiRepsonse(data: unknown): data is ApiResponse {
    if (typeof data !== 'object' || !data) return false;

    return (
        'properties' in data && 'timeseries' in (data as ApiResponse).properties
    );
}

export const formatForecast = (
    data: unknown,
    { interval, maxItems }: FromatOptions
): Forecast[] => {
    if (!isApiRepsonse(data)) return [];

    const until = addHours(now(), maxItems * interval);

    return data.properties.timeseries
        .filter(({ time }: Timeserie) => {
            const parsed = new Date(time);
            return parsed < until;
        })
        .filter((item: unknown, index: number) => {
            return index % interval === 0;
        })
        .filter((item: unknown, index: number) => {
            return index < maxItems;
        })
        .map((item: Timeserie) => ({
            timestamp: item.time,
            time: getTime(item.time),
            icon: item.data.next_1_hours.summary.symbol_code,
            temperature: Math.round(item.data.instant.details.air_temperature),
        }));
};