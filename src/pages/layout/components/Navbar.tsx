import { AppShell, Skeleton, ScrollArea, Group } from "@mantine/core";

import { ThemeToggle } from "../../../components/ThemeToggle";
import { SettingsButton } from "../../../components/SettingsButton";


function NavbarFooter() {
    return (
    <Group justify="space-between" gap="sm">
        <SettingsButton onClick={() => {}}/>
        <ThemeToggle/>
    </Group>);
}


export function Navbar() {
    return (
        <>
            <AppShell.Section grow my="md" component={ScrollArea}>
            60 links in a scrollable section
            {Array(15)
                .fill(0)
                .map((_, index) => (
                <Skeleton key={index} h={"2rem"} mt="sm" />
                ))}
            </AppShell.Section>
            <AppShell.Section>
                <NavbarFooter />
            </AppShell.Section>
        </>
    )
}