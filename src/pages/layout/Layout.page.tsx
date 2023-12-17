import { JSX } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { AppShell } from '@mantine/core';

import { RouteData } from '../../models/routing.models';
import { zIndexEnum } from '../../models/common.models';

import { Header } from './components/Header';
import { Navbar } from './components/Navbar';




export function Layout(props: { children: JSX.Element, routes: RouteData[]}) {
    const [isNavbarOpened, { close: closeNavbar, toggle: toggleNavbarOpen }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: !isNavbarOpened, mobile: !isNavbarOpened }}}
            padding='md'
            zIndex={1}>
            <AppShell.Header>
                <Header isBurgerOpened={isNavbarOpened} toggleBurgerOpen={toggleNavbarOpen} />
            </AppShell.Header>
            <AppShell.Navbar p='md' zIndex={zIndexEnum.FRONT}>
                <Navbar routes={props.routes} closeNavbar={closeNavbar}/>
            </AppShell.Navbar>
            <AppShell.Main px={'5%'} onClick={() => closeNavbar()}>
                {props.children}
            </AppShell.Main>
        </AppShell>
    );
}
