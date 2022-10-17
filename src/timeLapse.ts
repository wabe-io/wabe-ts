export type Day = {
  value: number;
  __brand: 'wabets-day';
};

export const days = (value: number): Day => ({
  value,
  __brand: 'wabets-day',
});

export type Hour = {
  value: number;
  __brand: 'wabets-hour';
};

export const hours = (value: number): Hour => ({
  value,
  __brand: 'wabets-hour',
});

export type Minute = {
  value: number;
  __brand: 'wabets-minute';
};

export const minutes = (value: number): Minute => ({
  value,
  __brand: 'wabets-minute',
});

export type Second = {
  value: number;
  __brand: 'wabets-second';
};

export const seconds = (value: number): Second => ({
  value,
  __brand: 'wabets-second',
});

export type Millisecond = {
  value: number;
  __brand: 'wabets-millisecond';
};

export const milliseconds = (value: number): Millisecond => ({
  value,
  __brand: 'wabets-millisecond',
});

type Timelapse = Millisecond | Second | Minute | Hour | Day;

export const toDate = (lapse: Timelapse): number =>
  lapse.__brand === 'wabets-millisecond'
    ? lapse.value
    : lapse.__brand === 'wabets-second'
    ? lapse.value * 1000
    : lapse.__brand === 'wabets-minute'
    ? lapse.value * 60000
    : lapse.__brand === 'wabets-hour'
    ? lapse.value * 3600000
    : lapse.value * 86400000;

export const toMillisecond = (value: number): Millisecond => ({
  value,
  __brand: 'wabets-millisecond',
});

export const toSecond = (value: number): Second => ({
  value: value / 1000,
  __brand: 'wabets-second',
});

export const toMinute = (value: number): Minute => ({
  value: value / (1000 * 60),
  __brand: 'wabets-minute',
});

export const toHour = (value: number): Hour => ({
  value: value / (1000 * 60 * 60),
  __brand: 'wabets-hour',
});

export const toDay = (value: number): Day => ({
  value: value / (1000 * 60 * 60 * 24),
  __brand: 'wabets-day',
});

export const addTimelapses = <T extends Timelapse>(
  lapse1: T,
  lapse2: Timelapse,
): T => ({
  ...lapse1,
  value:
    (toDate(lapse1) + toDate(lapse2)) /
    (lapse1.__brand === 'wabets-millisecond'
      ? 1
      : lapse1.__brand === 'wabets-second'
      ? 1000
      : lapse1.__brand === 'wabets-minute'
      ? 60000
      : lapse1.__brand === 'wabets-hour'
      ? 3600000
      : 86400000),
});

export const mulTimelapse = <T extends Timelapse>(
  lapse: T,
  scalar: number,
) => ({
  ...lapse,
  value: lapse.value * scalar,
});

export const divTimelapse = <T extends Timelapse>(
  lapse: T,
  scalar: number,
) => ({
  ...lapse,
  value: lapse.value / scalar,
});

export const compareTimelapses = (
  lapse1: Timelapse,
  lapse2: Timelapse,
  comparator: (val1: number, val2: number) => boolean,
): boolean => comparator(toDate(lapse1), toDate(lapse2));
