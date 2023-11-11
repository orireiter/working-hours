import { Image } from '@mantine/core';

import appIcon from '/icon.png';


export function AppIcon() {
    return (
        <Image w="auto" fit="contain" h="90%" src={appIcon}/>
    )
}