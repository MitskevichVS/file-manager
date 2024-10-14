import os from 'node:os';
import { messageService } from './messageService.mjs';

export const initialDirService = {
    _initialDir: os.homedir(),

    getInitialDir: () => initialDirService._initialDir,

    setInitial: () => {
        try {
            const homedir = os.homedir();
            process.chdir(homedir);
            initialDirService._initialDir = homedir;
        } catch (err) {
            messageService.error(err);
        }
    }
}