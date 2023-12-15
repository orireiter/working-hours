import { JSX } from 'react';

export interface Route {
    name?: string;
    path: string;
    element: JSX.Element;
}
