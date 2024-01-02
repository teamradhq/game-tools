import React from 'react';
import { TimeInput } from '@src/components/Timer/TimeInput.tsx';
import { TimeOptions } from '@src/components/Timer/TimeOptions.tsx';

export function TimeSelector(): React.JSX.Element {
  return (
    <>
      <TimeInput />
      <TimeOptions />
    </>
  );
}
