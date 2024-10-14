export const messageService = {
    success: (message) => {
        process.stdout.write(`\x1b[32m ${message} \x1b[0m \n`);
    },
    warning: (message) => {
        process.stdout.write(`\x1b[33m ${message} \x1b[0m \n`);
    },
    error: (message) => {
        process.stdout.write(`\x1b[31m ${message} \x1b[0m \n`);
    },
    message: (message) => {
        process.stdout.write(`\x1b[37m ${message} \x1b[0m \n`);
    },
};