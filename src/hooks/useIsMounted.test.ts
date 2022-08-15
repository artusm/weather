import {describe} from "vitest";
import {useIsMounted} from "./useIsMounted";
import {renderHook} from "@testing-library/react-hooks";


describe('useIsMounted', () => {
    test('should be defined', () => {
        expect(useIsMounted).toBeDefined();
    });

    test('should return true if component is mounted', () => {
        const {result} = renderHook(() => useIsMounted());

        expect(result).toBeTruthy();
    });
})