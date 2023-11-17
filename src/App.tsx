import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from './pages/layout/Layout.page';
import { Login } from './pages/login/Login.page';
import { Home } from './pages/home/Home.page';


const router = createBrowserRouter([
    {
        path: '/*',
        element: <Login />,
    },
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/home',
        element: <Home />,
    },
]);


function App() {
    return (
        <>
            <ColorSchemeScript defaultColorScheme='auto' />
            <MantineProvider defaultColorScheme='auto'>
                <Layout>
                    <RouterProvider router={router} />
                </Layout>
            </ MantineProvider>
        </>
    );
}

export default App;
