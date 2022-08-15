import {describe} from "vitest";
import {useIcon} from "./useIcon";
import {renderHook} from "@testing-library/react-hooks";

describe('useIcon', () => {
    test('should be defined', () => {
        expect(useIcon).toBeDefined();
    });

    test('should return find icon by alias', () => {
        const {result} = renderHook(() => useIcon('rainshowersandthunder_day'));

        expect(result.current).toBe('cloud-lightning');
    });

    test('should return fallback if alias is not found', () => {
        const {result} = renderHook(() => useIcon('some_randomtext'));

        expect(result.current).toBe('minus');
    });
})