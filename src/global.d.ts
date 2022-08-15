declare module 'feather-icons-react' {
    import type { FC } from 'react';

    import icons from 'feather-icons-react/build/icons.json';

    export type Icon = keyof typeof icons;

    interface IconProps {
        icon: Icon;
        size?: number | string;
        className?: string;
        fill?: string;
    }

    const FeatherIcon: FC<IconProps>;

    export default FeatherIcon;
}