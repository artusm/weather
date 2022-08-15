import {describe, vi} from "vitest";
import {renderHook, act} from "@testing-library/react-hooks";
import {useGeolocation} from "./useGeolocation";
import EventEmitter from 'events';

const createGeolocationSuccessEvent = (latitude: number, longitude: number) => ({
    coords: {
        latitude,
        longitude,
        accuracy: 1,
        heading: 1,
        speed: 1,
        altitude: 1,
        altitudeAccuracy: 1,
    },
    timestamp: 1
});

describe('useGeolocation', () => {
    beforeEach(() => {
        // @ts-ignore
        global.navigator.geolocation = {
            clearWatch: vi.fn(),
            watchPosition: vi.fn(),
            getCurrentPosition: vi.fn(),
        }
    });

    test('should return the position', () => {
        navigator.geolocation.watchPosition = (onSuccess) => {
            onSuccess(createGeolocationSuccessEvent(12, 12))

            return 1;
        };

        const { result } = renderHook(() => useGeolocation());
        const { latitude, longitude } = result.current;

        expect(latitude).toBe(12);
        expect(longitude).toBe(12);
    });

    test('should clear the watch', () => {
        navigator.geolocation.watchPosition = () => 111;

        const { unmount } = renderHook(() => useGeolocation());
        unmount();

        expect(navigator.geolocation.clearWatch).toHaveBeenCalledWith(111);
    });

    test('should return the error', () => {
        const geolocationPositionError = new Error() as unknown as GeolocationPositionError;

        navigator.geolocation.watchPosition = (onSuccess, onError: PositionErrorCallback) => {
            onError(geolocationPositionError);

            return 1;
        };

        const { result } = renderHook(() => useGeolocation());
        const { error } = result.current;

        expect(error).toBe(geolocationPositionError);
    });

    test('should return the updated position', () => {
        const emitter = new EventEmitter();

        navigator.geolocation.watchPosition = (onSuccess) => {
            onSuccess(createGeolocationSuccessEvent(0, 0));

            emitter.on('newSuccessEvent', onSuccess);

            return 1;
        };

        const { result } = renderHook(() => useGeolocation());
        let {latitude, longitude} = result.current;

        expect(latitude).toBe(0);
        expect(longitude).toBe(0);

        act(() => {
            emitter.emit('newSuccessEvent', createGeolocationSuccessEvent(1, 1));
        });

        const geoState = result.current;

        expect(geoState.latitude).toBe(1);
        expect(geoState.longitude).toBe(1);
    });

})