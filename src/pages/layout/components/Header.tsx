import { Group, Burger, Title, Image } from '@mantine/core';

// eslint-disable-next-line import/no-unresolved
import appIcon from '/icon.png';


export function Header(props: { toggleBurgerOpen: () => void, isBurgerOpened: boolean }) {
    return (
        <Group h='100%' px='md'>
            <Burger opened={props.isBurgerOpened} onClick={props.toggleBurgerOpen} size='sm' />
            <Image opacity={0.8} w='auto' fit='contain' h='90%' src={appIcon} />
            <Title>!SITE_NAME!</Title>
        </Group>
    );
}
