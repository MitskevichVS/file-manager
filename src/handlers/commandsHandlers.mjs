import { readdir } from 'node:fs/promises';
import { user } from '../helpers/user.mjs';
import { messageService } from '../helpers/messageService.mjs';
import { initialDirService } from '../helpers/initialDirService.mjs';

export const handleCdCommand = (command) => {
    const [_, path] = command.split(" ");

    messageService.message('Starting directory: ' + process.cwd());

    if (!path || !path.includes(initialDirService.getInitialDir())) {
        return;
    }

    try {
        process.chdir(path);
        messageService.message('New directory: ' + process.cwd());
    }
    catch (err) {
        messageService.error('cd err: ' + err);
    }
};

export const handleUpCommand = () => {
    messageService.message('Starting directory: ' + process.cwd());

    if (!process.cwd().includes(initialDirService.getInitialDir()) || process.cwd() === initialDirService.getInitialDir()) {
        return;
    }

    try {
        process.chdir('..');
        messageService.message('New directory: ' + process.cwd());
    }
    catch (err) {
        messageService.error('up err: ' + err);
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
        messageService.error('ls err: ' + err);
    }
};

export const handleExitCommand = () => {
    messageService.message(`\nThank you for using File Manager, ${user.getUserName()}, goodbye!`);
    process.exit();
}

export const handleDefaultCommand = () => {
    messageService.message('Operation failed');
};