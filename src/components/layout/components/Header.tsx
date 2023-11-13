import { Group, Burger, Title, Image, ActionIcon, useMantineColorScheme, useComputedColorScheme, Container } from "@mantine/core"
import { IconSun, IconMoon } from '@tabler/icons-react';

import appIcon from '/icon.png';


export function ActionToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
      >
        <Container lightHidden={true}>
            <IconSun stroke={1.5} />
        </Container>
        <Container darkHidden={true}>
            <IconMoon stroke={1.5} />
        </Container>
      </ActionIcon>
    </Group>
  );
}


export function Header(props: { toggleBurgerOpen: () => void, isBurgerOpened: boolean }) {
    return (
        <Group h="100%" px="md" justify="space-between">
            <Group h="100%">
                <Burger opened={props.isBurgerOpened} onClick={props.toggleBurgerOpen} size="sm" />
                <Image w="auto" fit="contain" h="90%" src={appIcon}/>
                <Title>!SITE_NAME!</Title>
            </Group>
            <ActionToggle />
        </Group>
    )
}