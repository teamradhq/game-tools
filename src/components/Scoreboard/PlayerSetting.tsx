import { Player } from '@src/utils';
import React from 'react';
import { Box, Flex, Paper, Text } from '@mantine/core';

export function PlayerSetting(props: Readonly<Player>): React.JSX.Element {
  return (
    <Paper bg="black" px={8} py={4} data-testid="player-setting">
      <Flex align="center" py={0} my={0}>
        <Flex
          w="24"
          h="24"
          gap={0}
          p={0}
          my={4}
          bg={props.color}
          c="black"
          style={(theme) => {
            return {
              borderRadius: theme.radius.md,
            };
          }}
        >
          {props.order}
        </Flex>
        <Box m={0} style={{ flex: '1 1 auto' }}>
          <Text fs="24">{props.name}</Text>
        </Box>
      </Flex>
    </Paper>
  );
}
