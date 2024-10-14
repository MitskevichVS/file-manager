import { join } from "node:path";
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from "node:fs";
import { messageService } from "../helpers/messageService.mjs";

export const compressFile = (command) => {
    const [_, pathToFile, pathToNewDir] = command.split(" ");

    if (!pathToFile || !pathToNewDir) {
        handleError();
        reject();
        return;
    }

    const fileName = `${pathToFile}`.slice(pathToFile.lastIndexOf('/') + 1, pathToFile.lastIndexOf('.'));
    const targetPath = join(pathToNewDir, `${fileName}.br`);
    const zip = createBrotliCompress();
    const inputStream = createReadStream(pathToFile);
    const outputStream = createWriteStream(targetPath);

    inputStream.pipe(zip).pipe(outputStream);

    inputStream.on('error', (err) => messageService.error(err));
    outputStream.on('error', (err) => messageService.error(err));
}

export const decompressFile = (command) => {
    const [_, pathToFile, pathToNewDir] = command.split(" ");

    if (!pathToFile || !pathToNewDir) {
        handleError();
        return;
    }

    const fileName = `${pathToFile}`.slice(pathToFile.lastIndexOf('/') + 1, pathToFile.lastIndexOf('.'));
    const targetPath = join(pathToNewDir, `${fileName}.txt`);
    const zip = createBrotliDecompress();
    const inputStream = createReadStream(pathToFile);
    const outputStream = createWriteStream(targetPath)

    inputStream.pipe(zip).pipe(outputStream);

    inputStream.on('error', (err) => messageService.error(err));
    outputStream.on('error', (err) => messageService.error(err));
}