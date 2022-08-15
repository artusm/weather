import {useMemo} from "react";
import {Icon} from 'feather-icons-react';

interface IconProps {
    icon: Icon;
    alias: string[];
}

const icons: IconProps[] = [
    {
        icon: 'moon',
        alias: ['clearsky_night', 'fair_night'],
    },
    {
        icon: 'sun',
        alias: ['clearsky_day', 'fair_day'],
    },
    {
        icon: 'cloud',
        alias: ['fog', 'cloudy', 'partlycloudy_day', 'partlycloudy_night'],
    },
    {
        icon: 'sun',
        alias: ['fair_day', 'partlycloudy_day'],
    },
    {
        icon: 'cloud-snow',
        alias: [
            'lightsleet',
            'heavysleet',
            'heavysnow',
            'heavysnowshowers_day',
            'heavysnowshowers_night',
            'lightsleet',
            'lightsleetshowers_day',
            'lightsleetshowers_night',
            'lightsnow',
            'lightsnowshowers_day',
            'lightsnowshowers_night',
            'sleet',
            'sleetshowers_day',
            'sleetshowers_night',
            'snow',
            'snowshowers_day',
            'snowshowers_night',
        ],
    },
    {
        icon: 'cloud-rain',
        alias: [
            'heavyrain',
            'heavyrainshowers_day',
            'heavyrainshowers_night',
            'heavysleetshowers_day',
            'heavysleetshowers_night',
            'rain',
        ],
    },
    {
        icon: 'cloud-drizzle',
        alias: [
            'lightrain',
            'fog',
            'lightrain',
            'lightrainshowers_day',
            'lightrainshowers_night',
            'rainshowers_day',
            'rainshowers_night',
        ],
    },
    {
        icon: 'cloud-lightning',
        alias: [
            'heavyrainandthunder',
            'heavyrainshowersandthunder_day',
            'heavyrainshowersandthunder_night',
            'heavysleetandthunder',
            'heavysleetshowersandthunder_day',
            'heavysleetshowersandthunder_night',
            'heavysnowandthunder',
            'heavysnowshowersandthunder_day',
            'heavysnowshowersandthunder_night',
            'lightrainandthunder',
            'lightrainshowersandthunder_day',
            'lightrainshowersandthunder_night',
            'lightsleetandthunder',
            'lightsnowandthunder',
            'lightssleetshowersandthunder_day',
            'lightssleetshowersandthunder_night',
            'lightssnowshowersandthunder_day',
            'lightssnowshowersandthunder_night',
            'rainandthunder',
            'rainshowersandthunder_day',
            'rainshowersandthunder_night',
            'sleetandthunder',
            'sleetshowersandthunder_day',
            'sleetshowersandthunder_night',
            'snowandthunder',
            'snowshowersandthunder_day',
            'snowshowersandthunder_night',
        ],
    },
];

export const useIcon = (iconName: string): Icon => {
    const selectedIcon = useMemo(() => icons.find(i => i.alias.includes(iconName)), [iconName]);

    if (!selectedIcon) return 'minus';

    return selectedIcon.icon;
}
