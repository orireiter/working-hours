import { notifications } from '@mantine/notifications';

import { CustomError } from '../models/errors.models';


export function notifyError(error: unknown, defaultId = '', defaultTitle = 'Something went wrong', defaultMessage = '') {
    let errorId = defaultId;
    let errorTitle = defaultTitle;
    let errorMessage = defaultMessage;
    

    if (error instanceof CustomError) {
        errorId = error.id;
        errorTitle = error.title;
        errorMessage = error.message;
    }

    notifications.show({
        id: errorId,
        title: errorTitle,
        message: errorMessage,
    });
}
