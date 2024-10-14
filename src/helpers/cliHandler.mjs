import { commandsMap } from '../constants/commands.mjs';
import { handleExitCommand } from '../handlers/commandsHandlers.mjs';

export const subscribe = () => {
    process.stdin.on('data', (data) => {
        let handler;
        const inputValue = `${data}`.trim();
        const [primaryCommand, secondaryCommand] = inputValue.split(" ");
        if (primaryCommand === 'os') {
            handler = commandsMap[secondaryCommand] || commandsMap.default;
        } else {
            handler = commandsMap[primaryCommand] || commandsMap.default;
        }

        handler(inputValue);
    });

    process.on('SIGINT', handleExitCommand);
};