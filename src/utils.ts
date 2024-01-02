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
