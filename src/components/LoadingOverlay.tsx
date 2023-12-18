import { LoadingOverlay as MantineLoadingOverlay} from '@mantine/core';

import { zIndexEnum } from '../models/common.models';


export function LoadingOverlay(props: { isLoading: boolean, zIndex?: number}) {
    const zIndex = props.zIndex ?? zIndexEnum.BACK;

    return (
        <MantineLoadingOverlay visible={props.isLoading} zIndex={zIndex} overlayProps={{ radius: 'sm', blur: 2 }} />
    );
}
