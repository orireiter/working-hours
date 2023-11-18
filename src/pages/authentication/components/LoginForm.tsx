import { upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Group, Stack, TextInput, PasswordInput, Anchor, Button } from '@mantine/core';

import { isEmailValid, isPasswordValid } from '../../../utils';
import { useLogin } from '../../../hooks/auth.hooks';


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

    return (
        <form onSubmit={form.onSubmit((values) => void login(values.email, values.password))}>
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
