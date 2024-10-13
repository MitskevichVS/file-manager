import { handleLsCommand, handleCdCommand, handleUpCommand, handleDefaultCommand, handleExitCommand } from '../handlers/commandsHandlers.mjs';

export const commandsMap = {
    ls: handleLsCommand,
    cd: handleCdCommand,
    up: handleUpCommand,
    default: handleDefaultCommand,
    '.exit': handleExitCommand,
};