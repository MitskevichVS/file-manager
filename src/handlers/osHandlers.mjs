import os from 'node:os';
import { messageService } from '../helpers/messageService.mjs';

export const getEol = async () => {
    try {
        const eolData = os.EOL;
        const eolSymbol = await JSON.stringify(eolData);

        messageService.message(eolSymbol);
    } catch (err) {
        messageService.error(err);
    }
}

export const getCpus = async () => {
    try {
        const cpusData = os.cpus();
        const cpusInfo = await JSON.stringify(cpusData, null, " ");

        messageService.message(cpusInfo);
    } catch (err) {
        messageService.error(err);
    }

};

export const getHomeDir = () => {
    try {
        const homedir = os.homedir();

        messageService.message(homedir);
    } catch (err) {
        messageService.error(err);
    }
}

export const getSystemUserName = async () => {
    try {
        const { username } = os.userInfo();

        messageService.message(username);
    } catch (err) {
        messageService.error(err);
    }
}

export const getArchitecture = () => {
    try {
        const arch = os.arch();

        messageService.message(arch);
    } catch (err) {
        messageService.error(err);
    }
}