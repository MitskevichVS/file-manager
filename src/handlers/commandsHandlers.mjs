import { readdir } from 'node:fs/promises';
import { user } from '../helpers/user.mjs';

export const handleCdCommand = (command) => {
    const path = command.replace('cd ', '');

    console.log('Starting directory: ' + process.cwd());
    try {
        process.chdir(path);
        console.log('New directory: ' + process.cwd());
    }
    catch (err) {
        console.log('cd err: ' + err);
    }
};

export const handleUpCommand = () => {
    console.log('Starting directory: ' + process.cwd());
    try {
        process.chdir('..');
        console.log('New directory: ' + process.cwd());
    }
    catch (err) {
        console.log('up err: ' + err);
    }
};

export const handleLsCommand = async () => {
    const currentDirectory = process.cwd();
    const readdirOptions = {
        withFileTypes: true,
    }

    try {
        const directoryContent = await readdir(currentDirectory, readdirOptions);
        const tableData = directoryContent
            .map((item) => ({
                Name: item.name,
                Type: item.isDirectory() 
                    ? 'directory'
                    : item.isFile()
                        ? 'file'
                        : 'unknown',
            }))
            .sort((a, b) => {
                return a.Type.toLowerCase().localeCompare(b.Type.toLowerCase()) || a.Name.toLowerCase().localeCompare(b.Name.toLowerCase())
            });

        console.table(tableData);
    }
    catch (err) {
        console.log('ls err: ' + err);
    }
};

export const handleExitCommand = () => {
    console.log(`\nThank you for using File Manager, ${user.getUserName()}, goodbye!`);
    process.exit();
}

export const handleDefaultCommand = () => {
    console.log('Operation failed');
};