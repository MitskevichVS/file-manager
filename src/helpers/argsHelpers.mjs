import { messageService } from './messageService.mjs';
import { user } from './user.mjs';

const userNameKey = '--username=';

export const initUser = () => {
    const cmdLineArgs = process.argv.slice(2);
    const argWithUserName = cmdLineArgs.find((item) => item.includes(userNameKey));
    const userName = argWithUserName.replace(userNameKey, '');

    user.setUserName(userName);

    messageService.message(`Welcome to the File Manager, ${userName}!`);
}