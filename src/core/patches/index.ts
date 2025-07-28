import menuButtons from './menuButtons';
import captureAnswers from './captureAnswers';
import bookworkBypass from './bookworkBypass';
import leaderboard from './leaderboard';

const patches = () => Promise.allSettled([
    menuButtons(),
    captureAnswers(),
    bookworkBypass(),
    leaderboard()
]);

export default patches;
