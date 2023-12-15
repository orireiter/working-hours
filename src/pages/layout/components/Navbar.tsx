import { AppShell, ScrollArea, Group, ActionIcon, Tooltip, Loader, NavLink, Container, Stack, Paper } from '@mantine/core';
import { useNavigate } from 'react-router';

import { ThemeToggle } from '../../../components/ThemeToggle';
import { useLogout, useAuthSession } from '../../../hooks/authentication.hooks';
import { RouteData } from '../../../models/routing.models';
import { Icon } from '../../../components/Icon';
import { IconEnum, ColorEnum } from '../../../models/common.models';


function NavbarRoutes(props: { closeNavbar: () => void, routes: RouteData[]}) {
    const navigate = useNavigate();

    const routesComponents =  [];
    
    for (const route of props.routes) {
        if (!route.name) {
            continue;
        }

        routesComponents.push(
            <Paper key={route.path} withBorder>
                <NavLink
                    href={route.path}
                    label={route.name}
                    onClick={(event) => {
                        event.preventDefault();
                        props.closeNavbar();
                        navigate(route.path);
                    }}
                    leftSection={route.iconEnum ? <Icon iconEnum={route.iconEnum} color={ColorEnum.BLUE}/> : null}
                />
            </Paper>
        );
    }

    return (
        <Stack gap='xs'>
            {routesComponents}
        </Stack>
    );
}


function NavbarFooter(props: { closeNavbar: () => void }) {
    const { isAuthenticated } = useAuthSession();
    const { logout, isLoading } = useLogout();

    let logoutButton = null;
    if(isAuthenticated) {
        logoutButton = (<ActionIcon onClick={() => {
            void logout();
            props.closeNavbar();
        }}
        variant='default'
        size='xl'
        aria-label='log out'
        radius={10}
        disabled={isLoading}
        >
            <Tooltip label='log out' offset={0} position='top'>
                <Container>
                    {isLoading ? <Loader /> : <Icon iconEnum={IconEnum.LOGOUT} />}
                </Container>
            </Tooltip>
        </ActionIcon>);
    } 

    return (
        <Group justify='space-between' gap='sm'>
            <ThemeToggle />
            {logoutButton}
        </Group>);
}


export function Navbar(props: { closeNavbar: () => void, routes: RouteData[]}) {
    return (
        <>
            <AppShell.Section grow my='md' component={ScrollArea}>
                <NavbarRoutes closeNavbar={props.closeNavbar} routes={props.routes} />
            </AppShell.Section>
            <AppShell.Section>
                <NavbarFooter closeNavbar={props.closeNavbar}/>
            </AppShell.Section>
        </>
    );
}
