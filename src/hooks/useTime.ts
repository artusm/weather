import { useEffect, useState } from 'react';

const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

const getTime = () => {
    const date = new Date();
    return [date.getHours(), date.getMinutes(), date.getSeconds()].map(
        formatTime
    );
};

export default function useTime() {
    const [time, setTime] = useState(() => getTime());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(getTime());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return {
        hours: time[0],
        minutes: time[1],
        seconds: time[2],
    };
}