import { AppShell, Skeleton, ScrollArea, Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import { ThemeToggle } from '../../../components/ThemeToggle';
import { useLogout, useAuthSession } from '../../../hooks/authentication.hooks';


function NavbarFooter(props: {closeNavbar: () => void}) {
    const { isAuthenticated } = useAuthSession();
    const { logout } = useLogout();

    let logoutIcon = null;
    if(isAuthenticated) {
        logoutIcon = (<ActionIcon onClick={() => {
            void logout();
            props.closeNavbar();
        }}
        variant='default'
        size='xl'
        aria-label='log out'
        radius={10}>
            <Tooltip label='log out' offset={0} position='top'>
                <IconLogout stroke={1.5} />
            </Tooltip>
        </ActionIcon>);
    } 

    return (
        <Group justify='space-between' gap='sm'>
            <ThemeToggle />
            {logoutIcon}
        </Group>);
}


export function Navbar(props: {closeNavbar: () => void}) {
    return (
        <>
            <AppShell.Section grow my='md' component={ScrollArea}>
                {Array(15)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} h={'2rem'} mt='sm' />
                    ))}
            </AppShell.Section>
            <AppShell.Section>
                <NavbarFooter closeNavbar={props.closeNavbar}/>
            </AppShell.Section>
        </>
    );
}
