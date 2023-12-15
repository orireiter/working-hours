import { Notification } from '@mantine/core';


export function Loading() {
    return (
        <Notification loading withCloseButton={false} title='Hang on'>
            loading...
        </Notification>
    );
}
