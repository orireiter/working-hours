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


const authenticatedRoutes: Route[] = [
    {
        path: '/',
        element: <Home />,
    }
];


const notAuthenticatedRoutes: Route[] = [
    {
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
                    <AppContent isLoading={isLoading} routesToUse={routesToUse} defaultURL={defaultURL} />
                </Layout>
            </ MantineProvider>
        </>
    );
}

export default App;
