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
  const remainingSeconds = seconds % 60;

  return [minutes, remainingSeconds];
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
