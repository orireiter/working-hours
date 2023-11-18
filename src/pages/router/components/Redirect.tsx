import { useEffect } from 'react';
import { Notification } from '@mantine/core';
import { useNavigate } from 'react-router-dom';


export function Redirect(props: {redirectTo: string}) {
    const navigate = useNavigate();

    useEffect(() => {        
        navigate(props.redirectTo);
    }, []);

    return (
        <Notification loading withCloseButton={false} title='Hang on'>
            loading...
        </Notification>
    );
}
