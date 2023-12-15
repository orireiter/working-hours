import { JSX } from 'react';

import { IconEnum } from './common.models';


export interface Route {
    name?: string;
    iconEnum?: IconEnum
    path: string;
    element: JSX.Element;
}
