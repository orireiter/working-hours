import { IconExclamationCircle, IconCircleCheck, IconLogout, IconLogin, IconHome, IconMoon, 
    IconSun, IconBriefcase, IconPlus, IconArrowDown, IconChevronDown, IconChevronUp, IconX, 
    IconTimeline } from '@tabler/icons-react';

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
    [IconEnum.ARROW_DOWN]: IconArrowDown,
    [IconEnum.CHEVRON_DOWN]: IconChevronDown,
    [IconEnum.CHEVRON_UP]: IconChevronUp,
    [IconEnum.X]: IconX,
    [IconEnum.TIMELINE]: IconTimeline
};


export function Icon(props: { iconEnum: IconEnum, color?: Color, sizeScale?: number}) {
    const IconComponent = enumToComopnent[props.iconEnum];

    
    return (<IconComponent stroke={2} color={props.color} style={{transform: `scale(${props.sizeScale ?? 1})`}}/>);
}
