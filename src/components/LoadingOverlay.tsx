import { LoadingOverlay as MantineLoadingOverlay} from '@mantine/core';

export function LoadingOverlay(props: { isLoading: boolean}) {
    return (
        <MantineLoadingOverlay visible={props.isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
    );
}
