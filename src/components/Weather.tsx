import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { WeatherItem } from './WeatherItem';
import {useWeather} from "../hooks/useWeather";


export const Weather = () => {
    const { data, error, loading } = useWeather();
console.log('error', error)
    if (error && !loading) {
        return (
            <div
                className="-translate-y-2 opacity-0 transition delay-[5000ms] duration-500"
                data-qa="weather-error"
            >
                <div className="flex items-center justify-center gap-2 text-center text-muted">
                    <div className="flex justify-center text-xl">
                        <FeatherIcon icon="alert-circle" />
                    </div>
                    <div className="text-[0.5em]">
                        Couldn&apos;t retrive weather forecast
                    </div>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex h-full items-center justify-center text-xl text-muted">
                <span className="spin">
                    <FeatherIcon icon="compass" />
                </span>
            </div>
        );
    }

    return (
        <div
            className="flex justify-center text-xl text-muted"
            data-qa="weather"
        >
            {data.map((item: any, index: number) => (
                <div
                    key={index}
                    style={
                        {
                            '--delay': index * 110 + 500 + 'ms',
                        } as React.CSSProperties
                    }
                    className={`flex flex-col items-center p-6 transition delay-[var(--delay)] duration-700 ease-in-out ${
                        loading ? 'translate-y-8 opacity-0' : ''
                    }`}
                >
                    <WeatherItem
                        icon={item!.icon}
                        time={item.time}
                        temperature={item.temperature}
                    />
                </div>
            ))}
        </div>
    );
};