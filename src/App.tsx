import React, { useState } from 'react';
import './App.css';
import { Box, Flex, NumberInput, Title } from '@mantine/core';

class HourGlass {
  readonly #time: number;

  #elapsed: number = 0;

  #interval: number | null = null;

  constructor(time: number) {
    this.#time = time;
  }

  get elapsed(): number {
    return this.#elapsed;
  }

  start(): void {
    this.#tick();
  }

  stop(): void {
    if (this.#interval) {
      clearInterval(this.#interval);
    }
  }

  reset(): void {
    this.#elapsed = 0;
  }

  flip(): void {
    this.#elapsed = this.#time - this.#elapsed;
  }

  #tick(): void {
    this.#interval = setInterval(() => {
      this.#elapsed = this.#elapsed + 1;

      if (this.#elapsed >= this.#time) {
        this.stop();
      }
    }, 1000);
  }
}

type TimeSelectionProps = {
  time: number;
  onChange?: (time: number) => void;
};

function TimeSelection(props: Readonly<TimeSelectionProps>): React.JSX.Element {
  const { time } = props;
  const [minutes, setMinutes] = useState(Math.floor(time / 60));
  const [seconds, setSeconds] = useState(time % 60);

  return (
    <Box>
      <Flex gap="sm">
        <NumberInput
          label="Minutes"
          value={minutes}
          w={150}
          onChange={(value) => {
            const n = Number(value);
            if (n < 0) {
              return;
            }

            setMinutes(n);
            props.onChange?.(n * 60 + seconds);
          }}
        />
        <NumberInput
          label="Seconds"
          value={seconds}
          w={150}
          onChange={(value) => {
            const n = Number(value);
            if (n < 0) {
              return;
            }

            const newMinutes = Math.floor(n / 60) + minutes;
            const newSeconds = n % 60;

            setMinutes(newMinutes);
            setSeconds(newSeconds);
            props.onChange?.(newMinutes * 60 + newSeconds);
          }}
        />
      </Flex>
    </Box>
  );
}

function App(): React.JSX.Element {
  const [time, setTime] = React.useState(330);
  const onChange = (time: number): void => {
    setTime(time);
  };

  return (
    <div>
      <Title order={1}>Paul Rules!</Title>
      <Title order={2}>{time}</Title>
      <TimeSelection time={time} onChange={onChange} />
    </div>
  );
}

export default App;
