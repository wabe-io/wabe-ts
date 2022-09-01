export const objectHasProp = <K extends PropertyKey>(
  data: unknown,
  prop: K,
): data is Record<K, unknown> =>
  typeof data === 'object' && data != null && prop in data;
