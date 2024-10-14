import { messageService } from '../helpers/messageService.mjs';

export const handleError = (customMessage) => {
    const message = customMessage || 'Operation failed';

    messageService.error(`${message}\n`);
}