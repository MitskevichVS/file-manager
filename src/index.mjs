import { initUser } from './helpers/argsHelpers.mjs';
import { subscribe } from './helpers/cliHandler.mjs';

const init =() => {
    initUser();
    subscribe();
};

const main = () => {
    init();
};

main();