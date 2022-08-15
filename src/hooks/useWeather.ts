import {formatForecast} from "../lib/metno";
import {useGeolocation} from "./useGeolocation";
import useFetch from "use-http";
import {Interceptors} from "use-http/dist/cjs/types";

const options = {
    interceptors: {
        response: async ({ response }) => {
            response.data = formatForecast(response.data, {
                interval: 3,
                maxItems: 5,
            });

            return response
        }
    } as Interceptors,
}

export const useWeather = () => {
    const { longitude, latitude, error: locationError } = useGeolocation();

    const { data, error, loading } = useFetch(
        longitude && latitude
            ? `https://api.met.no/weatherapi/locationforecast/2.0?lat=${latitude}&lon=${longitude}`
            : undefined,
        options,
        [longitude, longitude]
    );

    return {
        data,
        error: locationError,
        loading,
    };
};