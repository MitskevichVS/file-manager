import { commandsMap } from '../constants/commands.mjs';
import { handleExitCommand } from '../handlers/commandsHandlers.mjs';
import { messageService } from "../helpers/messageService.mjs";

export const subscribe = () => {
    process.stdin.on('data', async (data) => {
        let handler;
        const inputValue = `${data}`.trim();
        const [primaryCommand, secondaryCommand] = inputValue.split(" ");
        if (primaryCommand === 'os') {
            handler = commandsMap[secondaryCommand] || commandsMap.default;
        } else {
            handler = commandsMap[primaryCommand] || commandsMap.default;
        }

        await handler(inputValue);
        messageService.message(`You are currently in ${process.cwd()}`);
    });

    process.on('SIGINT', handleExitCommand);
};