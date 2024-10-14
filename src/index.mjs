import { initUser } from './helpers/argsHelpers.mjs';
import { subscribe } from './helpers/cliHandler.mjs';
import { initialDirService } from './helpers/initialDirService.mjs';

const init =() => {
    initUser();
    subscribe();
    initialDirService.setInitial();
};

const main = () => {
    init();
};

main();