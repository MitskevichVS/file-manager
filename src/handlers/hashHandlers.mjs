import { join } from "node:path";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { messageService } from "../helpers/messageService.mjs";

export const calculateHash = (command) => {
    const [_, path] = command.split(" ");

    if (!path) {
        handleError();
        return;
    }

    const pathToFile = join(process.cwd(), path);
    const inputStream = createReadStream(pathToFile);
    const hash = createHash('SHA256');
    const outputStream = inputStream.pipe(hash).setEncoding('hex');

    outputStream.pipe(process.stdout);

    inputStream.on('error', (err) => messageService.error(err));
    outputStream.on('error', (err) => messageService.error(err));
    outputStream.on('finish', () => messageService.message(''));

}