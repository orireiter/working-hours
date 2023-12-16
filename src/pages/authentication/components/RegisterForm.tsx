import { upperFirst } from '@mantine/hooks';
import { useForm, UseFormReturnType } from '@mantine/form';
import { Group, Stack, TextInput, PasswordInput, Anchor, Button, Checkbox, Loader } from '@mantine/core';

import configurations from '../../../configurations.json';
import { isEmailValid, isPasswordValid } from '../../../utils/validations.utils';
import { useRegister } from '../../../hooks/authentication.hooks';
import { useIsMobile } from '../../../hooks/general.hooks';


interface registerForm {
    name: string;
    email: string;
    password: string;
    terms: boolean;
}


function RegisterInputs(props: { form: UseFormReturnType<registerForm> }) {
    const isMobile = useIsMobile();
    const linkUnderline = isMobile ? 'always' : 'hover';

    const termsLabel = (<Group gap={'sm'} align='baseline'>
        I accept the 
        <Anchor href='!TERMS_AND_CONDITIONS_URL!' target='_blank' underline={linkUnderline} inline={true} >
            terms and conditions
        </Anchor>
    </ Group>
    );

    return (
        <Stack>
            <TextInput
                label='Name'
                placeholder='Your name'
                radius='md'
                {...props.form.getInputProps('name')}
            />

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

            <Checkbox
                label={termsLabel}
                checked={props.form.values.terms}
                {...props.form.getInputProps('terms')}
                error={props.form.errors.terms && 'You must accept the terms and conditions'}
            />

        </Stack>
    );
}


function RegisterActions(props: { isLoading: boolean, moveToLoginFunction: () => void }) {
    const isMobile = useIsMobile();
    const linkUnderline = isMobile ? 'always' : 'hover';
    
    return (
        <Group justify='space-between' mt='xl' grow>
            <Anchor component='button' type='button' c='dimmed' onClick={() => props.moveToLoginFunction()} size='xs' underline={linkUnderline}>
                Already have an account? Login
            </Anchor>
            <Button type='submit' radius='xl' disabled={props.isLoading}>
                {props.isLoading ? <Loader />  : upperFirst('register')}
            </Button>
        </Group>
    );
}


interface RegisterFormProps {
    moveToLoginFunction: () => void;
    initialEmail?: string;
    initialPassword?: string;
    initialName?: string;
    initialIsTermsAgreed?: boolean;
}


export function RegisterForm(props: RegisterFormProps) {
    const { register, isLoading } = useRegister();
    
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

    const onSubmit = form.onSubmit((values: {email: string, password: string, name: string}) => {
        register(values.email, values.password, values.name)
            .then(() => props.moveToLoginFunction())
            .catch(() => {});
    });

    return (
        <form onSubmit={onSubmit}>
            <RegisterInputs form={form}/>
            <RegisterActions isLoading={isLoading} moveToLoginFunction={props.moveToLoginFunction} />
        </form>
    );
}
