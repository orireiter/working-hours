import { LoadingOverlay as MantineLoadingOverlay} from '@mantine/core';

import { zIndexEnum } from '../models/common.models';


export function LoadingOverlay(props: { isLoading: boolean}) {
    return (
        <MantineLoadingOverlay visible={props.isLoading} zIndex={zIndexEnum.BACK} overlayProps={{ radius: 'sm', blur: 2 }} />
    );
}
