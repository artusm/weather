import {Dispatch, SetStateAction, useLayoutEffect} from 'react';
import { useLocalStorage } from 'usehooks-ts'

import themes from '../themes';

export const useTheme = <T extends string>(
    defaultTheme: T
): [string, Dispatch<SetStateAction<string>>] => {
    const [theme, setTheme] = useLocalStorage('theme', defaultTheme);

    useLayoutEffect(() => {
        const json = themes[theme];

        for (const key in json) {
            document.documentElement.style.setProperty(`--${key}`, json[key]);
        }
    }, [theme]);

    return [theme, setTheme as Dispatch<SetStateAction<string>>];
};