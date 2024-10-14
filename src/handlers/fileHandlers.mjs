import { join } from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import { writeFile, unlink, rename } from 'node:fs/promises';
import { handleError } from "./errorHandler.mjs";
import { messageService } from '../helpers/messageService.mjs';

export const readFile = async (src = "") => {
    const path = src.split(" ")[1];

    if (!path) {
        handleError();
        return;
    }

    const pathToFile = join(process.cwd(), path);
    const readerStream = createReadStream(pathToFile);

    readerStream.setEncoding("UTF8");

    readerStream.on("data", (data) => {
        messageService.message(`${data}`);
    });

    readerStream.on("error", handleError);
};

export const createFile = async (command) => {
    const fileName = command.split(" ")[1];
    const currentDirectory = process.cwd();
    const src = join(currentDirectory, fileName);

    try {
        await writeFile(src, '', { flag: 'w' });
        messageService.success('File has been successfully created');
    } catch (err) {
        handleError(err);
    };
};

export const deleteFile = async (command, silent) => {
    const path = command.split(" ")[1];

    if (!path) {
        handleError();
        return;
    }

    const currentDirectory = process.cwd();
    const src = join(currentDirectory, path);

    try {
        await unlink(src);
        if (!silent) {
            messageService.success('File has been successfully deleted');
        }
    } catch (err) {
        !silent && handleError(err);
    };
};

export const renameFile = async (command) => {
    const [_, path, newFileName] = command.split(" ");
    const fileExtension = path.split('.').pop();

    if (!path || !newFileName || !fileExtension) {
        handleError();
        return;
    }

    const currentDirectory = process.cwd();
    const src = join(currentDirectory, path);
    const newSrc = join(`${src}`.slice(0, src.lastIndexOf('/')), `${newFileName}.${fileExtension}`);

    try {
        await rename(src, newSrc);
        messageService.success('File has been successfully renamed');
    } catch (err) {
        handleError(err);
    };
};

export const copyFile = (command, onFinishCallback, silent) => {
    return new Promise((resolve, reject) => {
        const [_, pathToFile, pathToNewDir] = command.split(" ");

        if (!pathToFile || !pathToNewDir) {
            handleError();
            reject();
            return;
        }

        const fileName = `${pathToFile}`.slice(pathToFile.lastIndexOf('/') + 1, pathToFile.length);
        const targetPath = join(pathToNewDir, fileName);

        const inputStream = createReadStream(pathToFile);
        const outputStream = createWriteStream(targetPath)

        inputStream.pipe(outputStream);

        inputStream.on('error', (err) => {
            !silent && messageService.error(err);
            reject(err);
        });
        outputStream.on('error', (err) => {
            !silent && messageService.error(err);
            reject(err);
        });

        outputStream.on('finish', () => {
            !silent && messageService.success(`File copy has been successfully created`);
            onFinishCallback?.();
            resolve();
        });
    });
};

export const moveFile = async (command) => {
    try {
        await copyFile(command, () => deleteFile(command, true), true);
        messageService.success(`File has been successfully moved`);
    } catch (err) {
        handleError(err);
    }
};