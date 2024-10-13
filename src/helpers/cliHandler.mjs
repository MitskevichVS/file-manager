import { commandsMap } from '../constants/commands.mjs';
import { handleExitCommand } from '../handlers/commandsHandlers.mjs';

export const subscribe = () => {
    process.stdin.on('data', (data) => {
        const inputValue = `${data}`.trim();
        const command = inputValue.split(" ")[0];
        const handler = commandsMap[command] || commandsMap.default;

        handler(inputValue);
    });

    process.on('SIGINT', handleExitCommand);
};