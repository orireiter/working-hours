import { Group, Burger, Title, Image } from '@mantine/core';

import configurations from '../../../configurations.json';
import { useIsMobile } from '../../../hooks/general.hooks';

// eslint-disable-next-line import/no-unresolved
import appIcon from '/icon.png';


export function Header(props: { toggleBurgerOpen: () => void, isBurgerOpened: boolean }) {
    const isMobile = useIsMobile();
    const titleSize = isMobile ? 'h2' : 'h1';

    return (
        <Group h='100%' px='md'>
            <Burger opened={props.isBurgerOpened} onClick={props.toggleBurgerOpen} size='sm' />
            <Image opacity={0.8} w='auto' fit='contain' h='80%' src={appIcon} />
            <Title size={titleSize}>{configurations.siteName}</Title>
        </Group>
    );
}
