import { createTheme, DEFAULT_THEME, Flex } from '@mantine/core';

export const theme = createTheme({
  components: {
    Paper: {
      defaultProps: {
        w: '100%',
        bg: 'dark.9',
        style: {
          borderRadius: DEFAULT_THEME.radius.md,
        },
      },
    },
    Flex: Flex.extend({
      defaultProps: {
        align: 'center',
        justify: 'center',
        gap: 'sm',
        my: 'sm',
      },
    }),
  },
});
