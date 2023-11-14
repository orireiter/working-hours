import { JSX } from "react"
import { AppShell, Skeleton, ScrollArea } from "@mantine/core"


export function Navbar(props: { footer?: JSX.Element}) {
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
            {props.footer ? <AppShell.Section>{props.footer}</AppShell.Section> : null}
        </>
    )
}