import '@mantine/core/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { Layout } from './pages/layout/Layout.page';
import { Router, Route } from './pages/router/Router.page';
import { Authentication } from './pages/authentication/Authentication.page';
import { Home } from './pages/home/Home.page';


const authenticatedRoutes: Route[] = [
    {
        path: '/',
        element: <Home />,
    }
];

const notAuthenticatedRoutes = [
    {
        path: '/login',
        element: <Authentication />,
    }
];


function App() {
    return (
        <>
            <ColorSchemeScript defaultColorScheme='auto' />
            <MantineProvider defaultColorScheme='auto'>
                <Notifications />
                <Layout>
                    <Router 
                        authenticatedRoutes={authenticatedRoutes} 
                        notAuthenticatedRoutes={notAuthenticatedRoutes}
                        defaultAuthenticatedURL='/'
                        defaultNotAuthenticatedURL='/login'
                    />
                </Layout>
            </ MantineProvider>
        </>
    );
}

export default App;
