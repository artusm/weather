import github from './github.json';
import nightowl from './night-owl.json';
import nord from './nord.json';
import snazzy from './snazzy.json';

interface Theme {
    [key: string]: string;
}

const themes: { [key: string]: Theme } = {
    nightowl,
    github,
    nord,
    snazzy
};

export default themes;