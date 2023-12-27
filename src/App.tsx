import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { JSX } from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './pages/layout/Layout.page';
import { Home } from './pages/home/Home.page';
import { Authentication } from './pages/authentication/Authentication.page';
import { MyJobs } from './pages/myJobs/MyJobs.page';
import { Loading } from './components/Loading';
import { Redirect } from './components/Redirect';
import { useAuthSession } from './hooks/authentication.hooks';
import { RouteData } from './models/routing.models';
import { IconEnum } from './models/common.models';


const authenticatedRoutes: RouteData[] = [
    { 
        path: '/*', 
        element: <Redirect redirectTo={'/'}/> 
    },
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
        element: <MyJobs />,
    }
];


const notAuthenticatedRoutes: RouteData[] = [
    { 
        path: '/*', 
        element: <Redirect redirectTo={'/login'}/> 
    },
    { 
        path: '/', 
        element: <Redirect redirectTo={'/login'}/> 
    },
    {
        name: 'login',
        iconEnum: IconEnum.LOGIN,
        path: '/login',
        element: <Authentication />,
    },
];


function AppContent() {
    const { isAuthenticated, isLoading } = useAuthSession();
    
    let routesToUse: RouteData[] = [];
    let content: JSX.Element | JSX.Element[] = <Route element={<Loading />} path='/*'/>;

    if (!isLoading) {
        routesToUse = isAuthenticated ? authenticatedRoutes : notAuthenticatedRoutes;
        content = routesToUse.map((route) => {
            return (
                <Route key={route.path} element={route.element} path={route.path}/>
            );
        });
    }    

    return (
        <BrowserRouter>
            <Layout routes={routesToUse}>
                <Routes>
                    {content}
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
    

function App() {
    
    return (
        <>
            <ColorSchemeScript defaultColorScheme='auto' />
            <MantineProvider defaultColorScheme='auto'>
                <ModalsProvider>
                    <Notifications />
                    <AppContent />
                </ModalsProvider>
            </ MantineProvider>
        </>
    );
}

export default App;
