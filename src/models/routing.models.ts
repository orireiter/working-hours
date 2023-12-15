import { JSX } from 'react';

import { IconEnum } from './common.models';


export interface RouteData {
    name?: string;
    iconEnum?: IconEnum
    path: string;
    element: JSX.Element;
}
