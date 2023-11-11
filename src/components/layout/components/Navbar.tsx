import { AppShell, Skeleton, ScrollArea } from "@mantine/core"

export function Navbar() {
    return (
        <>
            <AppShell.Section>Navbar header</AppShell.Section>
            <AppShell.Section grow my="md" component={ScrollArea}>
            60 links in a scrollable section
            {Array(15)
                .fill(0)
                .map((_, index) => (
                <Skeleton key={index} h={"2rem"} mt="sm" />
                ))}
            </AppShell.Section>
            <AppShell.Section>Navbar footer – always at the bottom</AppShell.Section>
        </>
    )
}