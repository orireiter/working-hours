import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Route } from '../../models/routing.models';

import { Redirect } from './components/Redirect';



export function Router(props: { routesToUse: Route[], defaultURL?: string }) {
    const routesToUse = props.routesToUse;
    if (props.defaultURL) {
        routesToUse.push({ path: '/*', element: <Redirect redirectTo={props.defaultURL}/> });
    }

    const router = createBrowserRouter(props.routesToUse);
    return (<RouterProvider router={router}/>);
}
