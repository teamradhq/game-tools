import React from 'react';
import { Affix, Box, Button, Drawer, Flex, Title, VisuallyHidden } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSettings } from '@tabler/icons-react';

import { useAppSelector } from '@src/store/hooks.ts';
import { PlayerSetting } from '@src/components/Scoreboard/PlayerSetting.tsx';

export function GameDrawer(): React.JSX.Element {
  const [opened, { open, close }] = useDisclosure(false);
  const players = useAppSelector((state) => state.scoreboard.players);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Game Settings" size="xs">
        <Box py="sm">
          <Title order={3} mb="sm">
            Players
          </Title>
          <Flex direction="column" align="stretch">
            {players.map((player) => (
              <PlayerSetting key={player.name} {...player} />
            ))}
          </Flex>
        </Box>
      </Drawer>
      {!opened && (
        <Affix position={{ top: '1rem', left: '1rem' }}>
          <Button
            title="Game Settings"
            onClick={open}
            color="green"
            data-testId="gameScoreboard-settingsButton"
          >
            <IconSettings />
            <VisuallyHidden>Game Settings</VisuallyHidden>
          </Button>
        </Affix>
      )}
    </>
  );
}
