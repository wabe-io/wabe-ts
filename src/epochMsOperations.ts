import { EpochMs } from './epochMs';
import { Day, Hour, Millisecond, Minute, Second } from './timelapse';
import {
  dayToMs,
  hourToMs,
  minuteToMs,
  secondToMs,
} from './timelapseOperations';

export const addMsToEpoch = (epoch: EpochMs, ms: Millisecond): EpochMs =>
  (epoch + ms) as EpochMs;

export const addSecondsToEpoch = (epoch: EpochMs, s: Second): EpochMs =>
  (epoch + secondToMs(s)) as EpochMs;

export const addMinutesToEpoch = (epoch: EpochMs, m: Minute): EpochMs =>
  (epoch + minuteToMs(m)) as EpochMs;

export const addHoursToEpoch = (epoch: EpochMs, h: Hour): EpochMs =>
  (epoch + hourToMs(h)) as EpochMs;

export const addDaysToEpoch = (epoch: EpochMs, d: Day): EpochMs =>
  (epoch + dayToMs(d)) as EpochMs;
