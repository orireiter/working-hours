import { JSX } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useAuthSession } from '../../hooks/authentication.hooks';

import { Redirect } from './components/Redirect';


export interface Route {
    path: string;
    element: JSX.Element;
}

export function Router(props: { authenticatedRoutes: Route[], notAuthenticatedRoutes: Route[], defaultAuthenticatedURL?: string, defaultNotAuthenticatedURL?: string}) {
    const { isAuthenticated, isLoading } = useAuthSession();

    const routesToUse = isAuthenticated ? props.authenticatedRoutes : props.notAuthenticatedRoutes;
    
    if (props.defaultAuthenticatedURL && isAuthenticated) {
        routesToUse.push({path: '/*', element: <Redirect redirectTo={props.defaultAuthenticatedURL}/>});
    } else if (props.defaultNotAuthenticatedURL && !isAuthenticated) {
        routesToUse.push({path: '/*', element: <Redirect redirectTo={props.defaultNotAuthenticatedURL}/>});
    }

    const router = createBrowserRouter(routesToUse);
    return (<RouterProvider router={router}/>);
}
