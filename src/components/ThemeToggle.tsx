import { Group, ActionIcon, useMantineColorScheme, Container } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';


export function ThemeToggle() {
    const { colorScheme, setColorScheme } = useMantineColorScheme({keepTransitions: true});

    return (
        <Group justify='center'>
            <ActionIcon
                onClick={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
                variant='default'
                size='xl'
                aria-label='Toggle color scheme'
                radius={10}
            >
                <Container lightHidden={true}>
                    <IconSun stroke={1.5} />
                </Container>
                <Container darkHidden={true}>
                    <IconMoon stroke={1.5} />
                </Container>
            </ActionIcon>
        </Group>
    );
}
