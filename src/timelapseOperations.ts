import { DAY, HOUR, MINUTE, SECOND } from './time';
import { Day, Hour, Millisecond, Minute, Second } from './timelapse';

export const dayToMs = (value: Day): Millisecond =>
  (value * DAY) as Millisecond;

export const hourToMs = (value: Hour): Millisecond =>
  (value * HOUR) as Millisecond;

export const minuteToMs = (value: Minute): Millisecond =>
  (value * MINUTE) as Millisecond;

export const secondToMs = (value: Second): Millisecond =>
  (value * SECOND) as Millisecond;
