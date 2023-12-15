import { Group, ActionIcon, useMantineColorScheme, Container } from '@mantine/core';

import { IconEnum } from '../models/common.models';

import { Icon } from './Icon';


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
                    <Icon iconEnum={IconEnum.SUN}/>
                </Container>
                <Container darkHidden={true}>
                    <Icon iconEnum={IconEnum.MOON} />
                </Container>
            </ActionIcon>
        </Group>
    );
}
