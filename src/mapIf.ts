export const mapIfNotUndefined = <T, O>(
  fn: (input: T) => O,
  data: T | undefined,
): O | undefined => {
  if (data === undefined) {
    return undefined;
  }

  return fn(data);
};

export const mapIfNotNull = <T, O>(
  fn: (input: T) => O,
  data: T | null,
): O | null => {
  if (data === null) {
    return null;
  }

  return fn(data);
};

export const mapIfNotNullish = <T, O>(
  fn: (input: T) => O,
  data: T | null | undefined,
): O | null | undefined => {
  if (data === null || data === undefined) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data as any;
  }

  return fn(data);
};
