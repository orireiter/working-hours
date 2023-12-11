import { IconExclamationCircle, IconCircleCheck } from '@tabler/icons-react';

import { IconEnum, Color } from '../models/common.models';


const enumToComopnent = {
    [IconEnum.ERROR]: IconExclamationCircle,
    [IconEnum.SUCCESS]: IconCircleCheck
};


export function Icon(props: { iconEnum: IconEnum, color?: Color }) {
    const IconComponent = enumToComopnent[props.iconEnum];

    return (<>
        <IconComponent stroke={2} color={props.color}/>
    </>);
}
