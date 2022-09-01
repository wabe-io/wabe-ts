export const hasProp = <K extends PropertyKey>(
  data: object,
  prop: K,
): data is Record<K, unknown> => prop in data;
