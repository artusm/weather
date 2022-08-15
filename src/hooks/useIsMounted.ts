import { useEffect, useState } from 'react';

export type IsMountedState = boolean;

export function useIsMounted(): IsMountedState {
    const [isMounted, setIsMounded] = useState<IsMountedState>(false);

    useEffect(() => {
        setIsMounded(true);

        return () => {
            setIsMounded(false);
        }
    }, []);

    return isMounted;
}