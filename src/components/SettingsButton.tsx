import { ActionIcon, Tooltip } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";

export function SettingsButton(props: { onClick: () => void}) {
    return (
    <ActionIcon onClick={() => {props.onClick();}}
    variant="default"
    size="xl"
    aria-label="Toggle color scheme"
    radius={10}>
        <Tooltip label="settings" offset={0} position="top">
            <IconSettings stroke={1.5}/>
        </Tooltip>
    </ActionIcon>);
}