export type Day = number & {
  __brand: 'wabets-day';
};

export const Day = (value: number) => value as Day;

export type Hour = number & {
  __brand: 'wabets-hour';
};

export const Hour = (value: number) => value as Hour;

export type Minute = number & {
  __brand: 'wabets-minute';
};

export const Minute = (value: number) => value as Minute;

export type Second = number & {
  __brand: 'wabets-second';
};

export const Second = (value: number) => value as Second;

export type Millisecond = number & {
  __brand: 'wabets-millisecond';
};

export const Millisecond = (value: number) => value as Millisecond;
