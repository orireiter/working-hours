import { IconExclamationCircle, IconCircleCheck, IconLogout, IconHome, IconMoon, IconSun } from '@tabler/icons-react';

import { IconEnum, Color } from '../models/common.models';


const enumToComopnent = {
    [IconEnum.ERROR]: IconExclamationCircle,
    [IconEnum.SUCCESS]: IconCircleCheck,
    [IconEnum.LOGOUT]: IconLogout,
    [IconEnum.HOME]: IconHome,
    [IconEnum.SUN]: IconSun,
    [IconEnum.MOON]: IconMoon
};


export function Icon(props: { iconEnum: IconEnum, color?: Color }) {
    const IconComponent = enumToComopnent[props.iconEnum];

    return (<IconComponent stroke={2} color={props.color}/>);
}
