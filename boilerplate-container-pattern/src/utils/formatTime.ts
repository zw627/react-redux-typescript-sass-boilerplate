// Return time in `minute.second:millisecond` (e.g. 120.56:43) format

export function pad(num: number): string {
  // Add leading 0 to a number that is smaller than 10, and remove all fractional digits
  if (num < 10) return "0" + Math.trunc(num).toString();
  return Math.trunc(num).toString();
}

export default function formatTime(time: number): string {
  // `time`                               => 3594565    => milliseconds
  // `time / 1000`                        => 3594.565   => seconds.milliseconds

  // `Math.trunc(time / 1000)`            => 3594       => Remove decimal part

  // `(time / 1000).toFixed(0)`           => 3595       => 0 decimal place (has Math.round effect)
  // `(time / 1000).toFixed(2)`           => 3594.57    => 2 decimal places (has Math.round effect)
  // `(time / 1000).toFixed(2).slice(-2)` => 57         => 2 decimal places, last 2 characters (has Math.round effect)

  // `time % (1000 * 60)`                 => 54565      => remainder milliseconds that are not enough to form a minute
  // `(time % (1000 * 60)) / 1000`        => 54.565     => remainder seconds that are not enough to form a minute

  const minute = pad(time / 60000);
  const second = pad((time % 60000) / 1000);
  const millisecond = (time / 1000).toFixed(2).slice(-2);

  return `${minute}:${second}.${millisecond}`;
}
