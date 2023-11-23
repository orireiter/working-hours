import { upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Group, Stack, TextInput, PasswordInput, Anchor, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { isEmailValid, isPasswordValid } from '../../../utils';
import { useLogin } from '../../../hooks/auth.hooks';
import { CustomError } from '../../../models/errors.models';


interface LoginFormProps {
    moveToRegisterFunction: () => void;
    initialEmail?: string;
    initialPassword?: string;
}


export function LoginForm(props: LoginFormProps) {
    const login = useLogin();

    const form = useForm({
        initialValues: {
            email: props.initialEmail ?? '',
            password: props.initialPassword ??'',
        },

        validate: {
            email: (val) => !isEmailValid(val),
            password: (val) => !isPasswordValid(val),
        },
    });

    const formSubmitFunction = form.onSubmit((values) => {
        login(values.email, values.password)
            .catch((error) => {
                let errorMessage = null;
                let errorId = 'login-error';

                if (error instanceof CustomError) {
                    errorMessage = error.message;
                    errorId = error.id;
                }

                notifications.show({
                    id: errorId,
                    title: 'Failed to login',
                    message: errorMessage,
                });
            });
    });


    return (
        <form onSubmit={formSubmitFunction}>
            <Stack>

                <TextInput
                    required
                    label='Email'
                    placeholder='hello@!SITE_NAME!.com'
                    value={form.values.email}
                    onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                    error={form.errors.email && 'Invalid email'}
                    radius='md'
                />

                <PasswordInput
                    required
                    label='Password'
                    placeholder='Your password'
                    value={form.values.password}
                    onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                    error={form.errors.password && 'Password should include at least 8 characters, upper & lower characters, numbers and special characters'}
                    radius='md'
                />

            </Stack>

            <Group justify='space-between' mt='xl'>
                <Anchor component='button' type='button' c='dimmed' onClick={() => props.moveToRegisterFunction()} size='xs'>
                    Don&apos;t have an account? Register
                </Anchor>
                <Button type='submit' radius='xl'>
                    {upperFirst('login')}
                </Button>
            </Group>
        </form>);
}
