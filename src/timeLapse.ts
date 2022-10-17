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

type TimeLapse = Millisecond | Second | Minute | Hour | Day;

export const toDate = (lapse: TimeLapse): number =>
  lapse.__brand === 'wabets-millisecond'
    ? lapse.value
    : lapse.__brand === 'wabets-second'
    ? lapse.value * 1000
    : lapse.__brand === 'wabets-minute'
    ? lapse.value * 60 * 1000
    : lapse.__brand === 'wabets-hour'
    ? lapse.value * 1000 * 60 * 60
    : lapse.value * 1000 * 60 * 60 * 24;

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

export const addLapses = <T extends TimeLapse>(
  lapse1: T,
  lapse2: TimeLapse,
): T => ({
  ...lapse1,
  value:
    (toDate(lapse1) + toDate(lapse2)) /
    (lapse1.__brand === 'wabets-millisecond'
      ? 1
      : lapse1.__brand === 'wabets-second'
      ? 1000
      : lapse1.__brand === 'wabets-minute'
      ? 1000 * 60
      : lapse1.__brand === 'wabets-hour'
      ? 1000 * 60 * 60
      : 1000 * 60 * 60 * 24),
});

export const mulLapse = <T extends TimeLapse>(lapse: T, scalar: number) => ({
  ...lapse,
  value: lapse.value * scalar,
});

export const divLapse = <T extends TimeLapse>(lapse: T, scalar: number) => ({
  ...lapse,
  value: lapse.value / scalar,
});

export const compareLapses = (
  lapse1: TimeLapse,
  lapse2: TimeLapse,
  comparator: (val1: number, val2: number) => boolean,
): boolean => comparator(toDate(lapse1), toDate(lapse2));
