import '@mantine/core/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { Loading } from './components/Loading';
import { Layout } from './pages/layout/Layout.page';
import { Router } from './pages/router/Router.page';
import { Authentication } from './pages/authentication/Authentication.page';
import { Home } from './pages/home/Home.page';
import { useAuthSession } from './hooks/authentication.hooks';
import { Route } from './models/routing.models';
import { IconEnum } from './models/common.models';


const authenticatedRoutes: Route[] = [
    {
        name: 'Home',
        iconEnum: IconEnum.HOME,
        path: '/',
        element: <Home />,
    },
    {
        name: 'My Jobs',
        iconEnum: IconEnum.BRIEFCASE,
        path: '/jobs',
        element: <h1>ORI</h1>,
    }
];


const notAuthenticatedRoutes: Route[] = [
    {
        name: 'login',
        path: '/login',
        element: <Authentication />,
    }
];


function AppContent(props: { isLoading: boolean, routesToUse: Route[], defaultURL?: string }) {
    if (props.isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <Router 
            routesToUse={props.routesToUse}
            defaultURL={props.defaultURL}
        />
    );
}
    

function App() {
    const { isAuthenticated, isLoading } = useAuthSession();
    let routesToUse = notAuthenticatedRoutes;
    let defaultURL = '/login';
    
    if (isAuthenticated) {
        routesToUse = authenticatedRoutes;
        defaultURL = '/';
    } 

    return (
        <>
            <ColorSchemeScript defaultColorScheme='auto' />
            <MantineProvider defaultColorScheme='auto'>
                <Notifications />
                <Layout routes={routesToUse}>
                    <AppContent isLoading={isLoading} routesToUse={routesToUse} defaultURL={defaultURL} />
                </Layout>
            </ MantineProvider>
        </>
    );
}

export default App;
