import { handleLsCommand, handleCdCommand, handleUpCommand, handleDefaultCommand, handleExitCommand } from '../handlers/commandsHandlers.mjs';
import { readFile, createFile, deleteFile, renameFile, copyFile, moveFile } from '../handlers/fileHandlers.mjs';

export const commandsMap = {
    ls: handleLsCommand,
    cd: handleCdCommand,
    up: handleUpCommand,
    cat: readFile,
    add: createFile,
    rm: deleteFile,
    rn: renameFile,
    cp: copyFile,
    mv: moveFile,
    '.exit': handleExitCommand,
    default: handleDefaultCommand,
};