import { JSX } from "react";
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Group, Burger, Title } from "@mantine/core";

import { AppIcon } from "./components/AppIcon";

export function Layout(props: { children: JSX.Element} ) {
  const [opened, { toggle }] = useDisclosure();

  return (
      <AppShell
        header={{ height: 60 }}>
          <AppShell.Header>
            <Group h="100%" px="md">
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <AppIcon/>
              <Title>!SITE_NAME!</Title>
            </Group>
          </AppShell.Header>
          <AppShell.Main>
            {props.children}
          </AppShell.Main>
      </AppShell>
    );
}