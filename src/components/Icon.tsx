import { IconExclamationCircle, IconCircleCheck, IconLogout, IconLogin, IconHome, IconMoon, IconSun, IconBriefcase, IconPlus } from '@tabler/icons-react';

import { IconEnum, Color } from '../models/common.models';


const enumToComopnent = {
    [IconEnum.ERROR]: IconExclamationCircle,
    [IconEnum.SUCCESS]: IconCircleCheck,
    [IconEnum.LOGOUT]: IconLogout,
    [IconEnum.LOGIN]: IconLogin,
    [IconEnum.HOME]: IconHome,
    [IconEnum.SUN]: IconSun,
    [IconEnum.MOON]: IconMoon,
    [IconEnum.BRIEFCASE]: IconBriefcase,
    [IconEnum.PLUS]: IconPlus,
};


export function Icon(props: { iconEnum: IconEnum, color?: Color }) {
    const IconComponent = enumToComopnent[props.iconEnum];

    return (<IconComponent stroke={2} color={props.color}/>);
}
