import React, { PropsWithChildren } from 'react';
import { Container, Flex, Title } from '@mantine/core';

import { HomeLink } from '@src/components/Utils/HomeLink.tsx';

export type LayoutProps = {
  title?: string;
};

export function Layout({
  children,
  ...props
}: Readonly<PropsWithChildren<LayoutProps>>): React.JSX.Element {
  return (
    <>
      {props.title && (
        <Flex px="md" py="xl">
          <Title order={1}>{props.title}</Title>
        </Flex>
      )}
      <Container>{children}</Container>
      <HomeLink />
    </>
  );
}
