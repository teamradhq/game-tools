export * from './scoreboard';
/**
 * Returns the total number of seconds converted from minutes and seconds.
 *
 * @param minutes
 * @param seconds
 */
export function fromMinutesAndSeconds([minutes, seconds]: [number, number]): number {
  return minutes * 60 + seconds;
}

/**
 * Split time into minutes and seconds.
 *
 * @param seconds
 */
export function toMinutesAndSeconds(seconds: number): [number, number] {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return [minutes > 0 ? minutes : 0, remainingSeconds > 0 ? remainingSeconds : 0];
}

/**
 * Get a string representation in minutes and seconds.
 *
 * @param seconds
 */
export function formatMinutesAndSeconds(seconds: number): string {
  const [minutes, remainingSeconds] = toMinutesAndSeconds(seconds);

  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

/**
 * Given time and elapsed time determine a progress color. The color will progress through green, yellow and
 * red as the elapsed time gets closer to the limit.
 *
 * @param elapsed
 * @param time
 */
export function getProgressColor(elapsed: number, time: number): string {
  if (elapsed >= time - time / 4) {
    return 'red';
  }

  if (elapsed >= time - time / 2) {
    return 'yellow';
  }

  return 'green';
}
