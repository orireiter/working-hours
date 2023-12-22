import { Affix as MantineAffix } from '@mantine/core';

import { zIndexEnum } from '../models/common.models';


export function Affix(props: {children: React.ReactNode, zIndex?: number}) {
    const zIndex = props.zIndex ?? zIndexEnum.BACK;

    return (
        <MantineAffix position={{ bottom: 20, right: 20 }} zIndex={zIndex}>
            {props.children}
        </MantineAffix>
    );
}
