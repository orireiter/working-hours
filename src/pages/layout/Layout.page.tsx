import { JSX } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { AppShell } from '@mantine/core';

import { Header } from './components/Header';
import { Navbar } from './components/Navbar';


export function Layout(props: { children: JSX.Element }) {
    const [isNavbarOpened, { toggle: toggleNavbarOpen }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: !isNavbarOpened, mobile: !isNavbarOpened } }}
            padding='md'
            zIndex={1}>
            <AppShell.Header>
                <Header isBurgerOpened={isNavbarOpened} toggleBurgerOpen={toggleNavbarOpen} />
            </AppShell.Header>
            <AppShell.Navbar p='md'>
                <Navbar />
            </AppShell.Navbar>
            <AppShell.Main px={'5%'}>
                {props.children}
            </AppShell.Main>
        </AppShell>
    );
}
