export type Mapper<I, O> = (val: I) => O | undefined;

export interface Wrapper<T> {
  map: <O>(fn: Mapper<T, O>) => Wrapper<O>;
  isSomething: () => boolean;
  value: (errorMessage?: string) => T;
  valueOrDefault: <K>(def: K) => T | K;
  valueOrUndefined: () => T | undefined;
}

export const wrap = <T>(val: T | undefined): Wrapper<T> => ({
  map: <O>(fn: Mapper<T, O>): Wrapper<O> => {
    if (val === undefined) {
      return wrap<O>(undefined);
    }
    return wrap<O>(fn(val));
  },
  isSomething: () => val !== undefined,
  value: (errorMessage) => {
    if (val === undefined) {
      throw new Error(errorMessage ?? 'Wrapper value is undefined');
    }
    return val;
  },
  valueOrDefault: <K>(def: K) => {
    if (val === undefined) {
      return def;
    }
    return val;
  },
  valueOrUndefined: () => val,
});
