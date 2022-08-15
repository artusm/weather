import { useState, useEffect } from 'react';

export interface GeoLocationSensorState {
    loading: boolean;
    latitude: number | null;
    longitude: number | null;
    error?: Error | GeolocationPositionError;
}

export function useGeolocation(options?: PositionOptions): GeoLocationSensorState {
    const [geoState, setGeoState] = useState<GeoLocationSensorState>({
        loading: true,
        latitude: null,
        longitude: null,
    });

    useEffect(() => {
        let canceled = false;

        const onSuccess = (event: any) => {
            if (canceled) return;

            setGeoState({
                loading: false,
                latitude: event.coords.latitude,
                longitude: event.coords.longitude,
            });
        }

        const onError = (error: GeolocationPositionError) => {
            if (canceled) return;

            setGeoState((oldState) => ({ ...oldState, loading: false, error }));
        }

       navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
       let watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);

       return () => {
           canceled = true;
           navigator.geolocation.clearWatch(watchId);
       }
    }, []);

    return geoState;
}