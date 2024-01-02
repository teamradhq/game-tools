import React from 'react';
import { Button, VisuallyHidden } from '@mantine/core';
import type { MantineColor, MantineRadius, MantineSize, MantineStyleProp } from '@mantine/core';
import type { TablerIconsProps } from '@tabler/icons-react';

export type ControlButtonProps = {
  Icon: (props: TablerIconsProps) => React.JSX.Element;
  size?: MantineSize;
  color?: MantineColor;
  radius?: MantineRadius;
  style?: MantineStyleProp;
  title?: string;
  disabled?: boolean;
  onClick: () => void;
};

/**
 * Define a control button with icon that can be used to dispatch a simple action.
 *
 * @param props
 */

export function ControlButton(props: Readonly<ControlButtonProps>): React.JSX.Element {
  const { Icon, title } = props;

  return (
    <Button
      title={props.title}
      size={props.size ?? 'md'}
      color={props.color ?? 'gray'}
      radius={props.radius ?? 'md'}
      style={props.style ?? { margin: '0.25rem' }}
      disabled={props.disabled ?? false}
      onClick={props.onClick}
      variant="filled"
    >
      <Icon size={36} />
      {title && <VisuallyHidden>{title}</VisuallyHidden>}
    </Button>
  );
}
