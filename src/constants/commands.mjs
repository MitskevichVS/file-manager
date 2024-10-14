import { handleLsCommand, handleCdCommand, handleUpCommand, handleDefaultCommand, handleExitCommand } from '../handlers/commandsHandlers.mjs';
import { readFile, createFile, deleteFile, renameFile, copyFile, moveFile } from '../handlers/fileHandlers.mjs';
import { calculateHash } from '../handlers/hashHandlers.mjs';
import { getArchitecture, getCpus, getEol, getHomeDir, getSystemUserName } from '../handlers/osHandlers.mjs';
import { compressFile, decompressFile } from '../handlers/zipHandlers.mjs';

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
    hash: calculateHash,
    compress: compressFile,
    decompress: decompressFile,
    '.exit': handleExitCommand,
    default: handleDefaultCommand,
};