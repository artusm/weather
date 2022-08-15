import FeatherIcon from 'feather-icons-react';
import type { Forecast } from '../types';
import {useIcon} from '../hooks/useIcon';

export const WeatherItem = (props: Omit<Forecast, 'timestamp'>) => {
    const symbol = '°C';
    const icon = useIcon(props.icon);

    return (
        <div className="group flex transform flex-col items-center transition duration-700 ease-in-out hover:-translate-y-2">
            <div className="translate-y-6 scale-50 transform py-4 text-xs opacity-0 transition duration-700 ease-in-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                {props.time}
            </div>
            <FeatherIcon
                icon={icon}
                size="24"
                className="text-foreground opacity-40 transition duration-700 ease-in-out group-hover:opacity-100"
            />
            <div className="-translate-y-3 scale-75 transform py-4 text-xs text-primary opacity-50 transition duration-700 ease-in-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                {props.temperature}
                {symbol}
            </div>
        </div>
    );
};