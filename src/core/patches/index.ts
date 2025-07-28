import menuButtons from './menuButtons';
import captureAnswers from './captureAnswers';
import bookworkBypass from './bookworkBypass';
import leaderboardName from './leaderboardName';

const patches = () => Promise.allSettled([
    menuButtons(),
    captureAnswers(),
    bookworkBypass(),
    leaderboardName()
]);

export default patches;
