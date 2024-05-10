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

export const ifNotUndefined =
  <T, O>(fn: (input: T) => O) =>
  (input: T | undefined): O | undefined => {
    if (input === undefined) {
      return undefined;
    }

    return fn(input);
  };

export const ifNotNull =
  <T, O>(fn: (input: T) => O) =>
  (input: T | null): O | null => {
    if (input === null) {
      return null;
    }

    return fn(input);
  };

export const ifNotNullish =
  <T, O>(fn: (input: T) => O) =>
  (input: T | null | undefined): O | null | undefined => {
    if (input === null || input === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return input as any;
    }

    return fn(input);
  };
