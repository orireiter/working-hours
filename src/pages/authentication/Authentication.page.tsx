import { JSX } from 'react';
import { useToggle } from '@mantine/hooks';
import { Text, Paper, Group, PaperProps, Divider, Container } from '@mantine/core';

import configurations from '../../configurations.json';

import { GoogleButton } from './components/GoogleButton';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';


enum AuthenticationType {
    SIGN_UP = 'register',
    SIGN_IN = 'sign in'
}


export function Authentication(props: PaperProps) {
    const [authenticationType, toggleAuthenticationType] = useToggle<AuthenticationType>([AuthenticationType.SIGN_IN, AuthenticationType.SIGN_UP]);

    let authenticationForm: JSX.Element;
    if (authenticationType === AuthenticationType.SIGN_UP) {
        authenticationForm = <RegisterForm moveToLoginFunction={toggleAuthenticationType} />;
    } else {
        authenticationForm = <LoginForm moveToRegisterFunction={toggleAuthenticationType} />;
    }

    return (
        <Container size='30rem'>
            <Paper radius='md' p='xl' withBorder {...props}>
                <Text size='lg' fw={500}>
                    Welcome to {configurations.siteName}, {authenticationType} with
                </Text>

                <Group grow mb='md' mt='md'>
                    <GoogleButton radius='xl'>Google</GoogleButton>
                </Group>

                <Divider label='Or continue with email' labelPosition='center' my='lg' />

                {authenticationForm}
            </Paper>
        </ Container>
    );
}
