import { notifications } from '@mantine/notifications';

import { Icon } from '../components/Icon';
import { IconEnum, ColorEnum } from '../models/common.models';
import { CustomError } from '../models/errors.models';


export function notifySuccess(id: string, title: string, message = '') {
    notifications.show({
        id, 
        title, 
        message, 
        icon: Icon({iconEnum: IconEnum.SUCCESS, color: ColorEnum.GREEN}), 
        color: 'transparent'
    });
}


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
        icon: Icon({iconEnum: IconEnum.ERROR, color: ColorEnum.RED}),
        color: 'transparent'
    });
}
