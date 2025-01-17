import { upperFirst } from '@mantine/hooks';
import { useForm, UseFormReturnType } from '@mantine/form';
import { Group, Stack, TextInput, PasswordInput, Anchor, Button, Loader } from '@mantine/core';

import configurations from '../../../configurations.json';
import { isEmailValid, isPasswordValid } from '../../../utils/validations.utils';
import { useLogin } from '../../../hooks/authentication.hooks';
import { useIsMobile } from '../../../hooks/general.hooks';


interface loginForm {
    email: string;
    password: string;
}


function LoginInputs(props: { form: UseFormReturnType<loginForm> }) {
    return (
        <Stack>
            <TextInput
                required
                type='email'
                label='Email'
                placeholder={`${configurations.defaultEmailAddress}`}
                radius='md'
                {...props.form.getInputProps('email')}
                error={props.form.errors.email && 'Invalid email'}
            />

            <PasswordInput
                required
                type='password'
                label='Password'
                placeholder='Your password'
                radius='md'
                {...props.form.getInputProps('password')}
                error={props.form.errors.password && 'Password should include at least 8 characters, upper & lower characters, numbers and special characters'}
            />

        </Stack>
    );
}


function LoginActions(props: { isLoading: boolean, moveToRegisterFunction: () => void }) {
    const isMobile = useIsMobile();
    const linkUnderline = isMobile ? 'always' : 'hover';

    return (
        <Group justify='space-between' mt='xl' grow>
            <Anchor component='button' type='button' c='dimmed' onClick={() => props.moveToRegisterFunction()} size='xs' underline={linkUnderline}>
                Don&apos;t have an account? Register
            </Anchor>
            <Button type='submit' radius='xl' disabled={props.isLoading}>
                {props.isLoading ? <Loader /> : upperFirst('login')}
            </Button>
        </Group>
    );   
}


interface LoginFormProps {
    moveToRegisterFunction: () => void;
    initialEmail?: string;
    initialPassword?: string;
}


export function LoginForm(props: LoginFormProps) {
    const { login, isLoading }= useLogin();

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

    const onSubmit = form.onSubmit((values) => void login(values.email, values.password));

    return (
        <form onSubmit={onSubmit}>
            <LoginInputs form={form}/>
            <LoginActions isLoading={isLoading} moveToRegisterFunction={props.moveToRegisterFunction}/>
        </form>
    );
}
