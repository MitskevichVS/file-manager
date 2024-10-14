import { handleLsCommand, handleCdCommand, handleUpCommand, handleDefaultCommand, handleExitCommand } from '../handlers/commandsHandlers.mjs';
import { readFile, createFile, deleteFile, renameFile, copyFile, moveFile } from '../handlers/fileHandlers.mjs';
import { getArchitecture, getCpus, getEol, getHomeDir, getSystemUserName } from '../handlers/osHandlers.mjs';

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
    '--EOL': getEol,
    '--cpus': getCpus,
    '--homedir': getHomeDir,
    '--username': getSystemUserName,
    '--architecture': getArchitecture,
    '.exit': handleExitCommand,
    default: handleDefaultCommand,
};