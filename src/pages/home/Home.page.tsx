import { Notification } from '@mantine/core';

export function Home() {
    return (
        <Notification loading withCloseButton={false} title='Hang on'>
            loading home page...
        </Notification>
    );
}
