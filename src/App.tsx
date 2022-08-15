import React, { useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Time } from './components/Time';
import { Weather } from './components/Weather';
import { DateValue } from './components/DateValue';
import { SpaceBackground } from './components/SpaceBackground';

import { useTheme } from './hooks/useTheme';
import OutsideClickHandler from 'react-outside-click-handler';
import {useIsMounted} from './hooks/useIsMounted';

type Theme = 'nightowl' | 'snazzy' | 'github' | 'nord';
interface ThemeLabels {
    id: Theme;
    label: string;
}

const themes: ThemeLabels[] = [
    {
        id: 'nightowl',
        label: 'Night Owl',
    },
    {
        id: 'snazzy',
        label: 'Snazzy',
    },
    {
        id: 'github',
        label: 'GitHub (Light)',
    },
    {
        id: 'nord',
        label: 'Nord',
    },
];

function App() {
    const mounted = useIsMounted();
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [spaceMode, setSpaceMode] = useState<boolean>(true);

    const openModal = () => setActiveModal(true);
    const closeModel = () => setActiveModal(false);

    const [theme, setTheme] = useTheme<Theme>('nightowl');

    return (
        <div
            data-theme={theme}
            className="relative flex min-h-screen flex-col bg-background transition-colors duration-700"
        >
            {spaceMode ? <SpaceBackground active={spaceMode} /> : ''}

            <header className="flex items-center justify-end gap-4 p-12 text-xs text-foreground">
                <OutsideClickHandler onOutsideClick={() => closeModel()}>
                    <div className="relative space-y-2 text-right">
                        <AnimatePresence exitBeforeEnter initial={false}>
                            <button
                                className="z-50 -m-4 p-4 opacity-25 transition hover:opacity-90"
                                onClick={() =>
                                    activeModal ? closeModel() : openModal()
                                }
                                data-qa="theme-switcher"
                            >
                                {activeModal ? (
                                    <motion.span
                                        className="block"
                                        key="open"
                                        animate={{ opacity: 1, scale: 1 }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <FeatherIcon icon="x" />
                                        <span className="sr-only">
                                            Show theme options
                                        </span>
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        className="block"
                                        key="closed"
                                        animate={{ opacity: 1, scale: 1 }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <FeatherIcon icon="eye" />
                                        <span className="sr-only">
                                            Close theme options
                                        </span>
                                    </motion.span>
                                )}
                            </button>
                        </AnimatePresence>
                        <AnimatePresence>
                            {activeModal ? (
                                <>
                                    <div className="absolute right-0 w-40">
                                        <ul className="grid gap-1 font-mono">
                                            {themes.map((value, index) => (
                                                <motion.li
                                                    initial={{
                                                        opacity: 0,
                                                        translateX: '1rem',
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        translateX: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        translateX: '1rem',
                                                    }}
                                                    transition={{
                                                        duration: 0.2,
                                                        delay: 0 + index * 0.05,
                                                    }}
                                                    key={value.id}
                                                >
                                                    <button
                                                        className="transition hover:scale-125"
                                                        data-qa={`theme-${value.id}`}
                                                        onClick={() =>
                                                            setTheme(value.id)
                                                        }
                                                    >
                                                        {theme === value.id ? (
                                                            <>
                                                                <span className="pr-1 text-primary">
                                                                    {
                                                                        value.label
                                                                    }
                                                                </span>
                                                                <span className="text-primary">
                                                                    •
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span>
                                                                {value.label}
                                                            </span>
                                                        )}
                                                    </button>
                                                </motion.li>
                                            ))}
                                            {spaceMode ? (
                                                <motion.li
                                                    initial={{
                                                        opacity: 0,
                                                        translateX: '1rem',
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        translateX: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        translateX: '1rem',
                                                    }}
                                                    transition={{
                                                        duration: 0.2,
                                                        delay:
                                                            0 +
                                                            themes.length *
                                                            0.05,
                                                    }}
                                                    key="space"
                                                >
                                                    <button
                                                        className={`transition hover:scale-125`}
                                                        onClick={() =>
                                                            setSpaceMode(
                                                                !spaceMode
                                                            )
                                                        }
                                                    >
                                                        {spaceMode
                                                            ? '🌎'
                                                            : '🚀'}
                                                    </button>
                                                </motion.li>
                                            ) : (
                                                ''
                                            )}
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                ''
                            )}
                        </AnimatePresence>
                    </div>
                </OutsideClickHandler>
            </header>
            <main className="flex flex-grow flex-col items-center justify-center font-mono ">
                <div className="grid gap-6 text-center">
                    <div
                        className={`transform transition delay-100 duration-1000 ease-in-out ${
                            !mounted ? 'translate-y-12 opacity-0' : ''
                        }`}
                    >
                        <Time />
                    </div>
                    <div
                        className={`transform transition delay-100 duration-1000 ease-in-out ${
                            !mounted ? '-translate-y-4 opacity-0' : ''
                        }`}
                    >
                        <DateValue />
                    </div>
                </div>
                <div className="mt-4 h-[168px]">
                    <Weather />
                </div>
            </main>
        </div>
    );
}


export default App
