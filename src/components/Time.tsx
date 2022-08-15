import React from 'react';
import useTime from '../hooks/useTime';

export const Time = () => {
    const { hours, minutes, seconds } = useTime();

    return (
        <div className="text-center text-6xl">
            <TimeValue value={hours} />
            <TimeSeprator />
            <TimeValue value={minutes} />
            <TimeSeprator />
            <TimeValue value={seconds} />
        </div>
    );
};

interface TimeSepratorProps {
    char?: string;
}

export const TimeSeprator = ({ char = ' ' }: TimeSepratorProps) => (
    <span className="font-light text-muted">{char}</span>
);

interface TimeValueProps {
    value: number | string;
}

export const TimeValue = ({ value }: TimeValueProps) => {
    return <span className="text-primary">{value}</span>;
};