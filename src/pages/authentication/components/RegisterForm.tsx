import { upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Group, Stack, TextInput, PasswordInput, Anchor, Button, Checkbox } from '@mantine/core';

import configurations from '../../../configurations.json';
import { isEmailValid, isPasswordValid } from '../../../utils/validations.utils';
import { useRegister } from '../../../hooks/authentication.hooks';
import { useIsMobile } from '../../../hooks/general.hooks';


interface RegisterFormProps {
    moveToLoginFunction: () => void;
    initialEmail?: string;
    initialPassword?: string;
    initialName?: string;
    initialIsTermsAgreed?: boolean;
}


export function RegisterForm(props: RegisterFormProps) {
    const register = useRegister();
    const isMobile = useIsMobile();

    const linkUnderline = isMobile ? 'always' : 'hover';

    const form = useForm({
        initialValues: {
            email: props.initialEmail ?? '',
            password: props.initialPassword ??'',
            name: props.initialEmail ?? '',
            terms: props.initialIsTermsAgreed ?? false,
        },

        validate: {
            email: (val) => !isEmailValid(val),
            password: (val) => !isPasswordValid(val),
            terms: (val) => !val
        },
    });

    const termsLabel = (<Group gap={'sm'} align='baseline'>
        I accept the 
        <Anchor href='!TERMS_AND_CONDITIONS_URL!' target='_blank' underline={linkUnderline} inline={true} >
            terms and conditions
        </Anchor>
    </ Group>
    );

    const onSubmit = form.onSubmit((values: {email: string, password: string}) => {
        register(values.email, values.password)
            .then(() => props.moveToLoginFunction())
            .catch(() => {});
    });

    return (
        <form onSubmit={onSubmit}>
            <Stack>
                <TextInput
                    label='Name'
                    placeholder='Your name'
                    value={form.values.name}
                    onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                    radius='md'
                />

                <TextInput
                    required
                    label='Email'
                    placeholder={`${configurations.defaultEmailAddress}`}
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

                <Checkbox
                    label={termsLabel}
                    checked={form.values.terms}
                    onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                    error={form.errors.terms && 'You must accept the terms and conditions'}
                />

            </Stack>

            <Group justify='space-between' mt='xl' grow>
                <Anchor component='button' type='button' c='dimmed' onClick={() => props.moveToLoginFunction()} size='xs' underline={linkUnderline}>
                    Already have an account? Login
                </Anchor>
                <Button type='submit' radius='xl'>
                    {upperFirst('register')}
                </Button>
            </Group>
        </form>
    );
}
