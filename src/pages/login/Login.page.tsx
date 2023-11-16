import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput, PasswordInput, Text, Paper, Group, PaperProps, Button, Divider, Checkbox, Anchor, Stack, Container
} from '@mantine/core';

import { GoogleButton } from './components/GoogleButton';



export function Login(props: PaperProps) {
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: false,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    return (
        <Container size='30rem'>
            <Paper radius='md' p='xl' withBorder {...props}>
                <Text size='lg' fw={500}>
                    Welcome to !SITE_NAME!, {type} with
                </Text>

                <Group grow mb='md' mt='md'>
                    <GoogleButton radius='xl'>Google</GoogleButton>
                </Group>

                <Divider label='Or continue with email' labelPosition='center' my='lg' />

                <form onSubmit={form.onSubmit(() => { })}>
                    <Stack>
                        {type === 'register' && (
                            <TextInput
                                label='Name'
                                placeholder='Your name'
                                value={form.values.name}
                                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                                radius='md'
                            />
                        )}

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
                            error={form.errors.password && 'Password should include at least 6 characters'}
                            radius='md'
                        />

                        {type === 'register' && (
                            <Checkbox
                                label='I accept terms and conditions'
                                checked={form.values.terms}
                                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                            />
                        )}
                    </Stack>

                    <Group justify='space-between' mt='xl'>
                        <Anchor component='button' type='button' c='dimmed' onClick={() => toggle()} size='xs'>
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : 'Don\'t have an account? Register'}
                        </Anchor>
                        <Button type='submit' radius='xl'>
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Paper>
        </ Container>
    );
}
